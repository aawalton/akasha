import { createSnapshotHolder, type HeldSnapshot } from "../tools/lib/graph/held-snapshot.ts"
import type { PopulationEntry } from "../tools/lib/graph/queries/membership.ts"
import {
  seedFilesFor,
  type SeedSet,
  type SeedSource,
} from "../tools/lib/graph/queries/seed-files.ts"
import {
  workflowsReached,
  type WorkflowSeeds,
} from "../tools/lib/graph/queries/workflows-reached.ts"
import type { Node } from "../tools/lib/graph/types.ts"
import { resolveRoots } from "../repo/roots/roots"
import { clusterReachOf } from "../tools/lib/service-cluster-reach.ts"

const SLUG = "graph-service"
const SAYS = `[${SLUG}]`

const roots = resolveRoots()
const REACH = clusterReachOf(roots.instructions, SLUG)

const builtAt = (): string => {
  const got = Bun.spawnSync(["git", "-C", roots.instructions, "rev-parse", "--short", "HEAD"])
  return got.success ? new TextDecoder().decode(got.stdout).trim() : "unknown"
}

const BUILT = builtAt()

const holder = createSnapshotHolder()

const json = (body: unknown, status: number): Response =>
  new Response(`${JSON.stringify(body)}\n`, {
    status,
    headers: { "content-type": "application/json" },
  })

const typesIn = (params: URLSearchParams): readonly string[] | undefined => {
  const asked = params.getAll("type").filter((name) => name !== "")
  return asked.length === 0 ? undefined : asked
}

const keysIn = (params: URLSearchParams): ReadonlySet<string> | undefined => {
  const asked = params.getAll("key").filter((name) => name !== "")
  return asked.length === 0 ? undefined : new Set(asked)
}

const narrowToKeys = (
  nodes: readonly Node[],
  keys: ReadonlySet<string> | undefined
): readonly Node[] => (keys === undefined ? nodes : nodes.filter((node) => keys.has(node.key)))

const nodesIn = async (snapshot: HeldSnapshot, params: URLSearchParams): Promise<Response> => {
  const keys = keysIn(params)
  const nodes = narrowToKeys(snapshot.graph.nodes(typesIn(params)), keys)
  const parent = params.get("parent")
  if (keys === undefined || parent === null || parent === "") {
    return json({ identity: snapshot.identity, n: nodes.length, nodes }, 200)
  }
  const earlier = await holder.at(parent)
  const standing = new Set(nodes.map((node) => node.id))
  const gone = narrowToKeys(earlier.graph.nodes(typesIn(params)), keys).filter(
    (node) => !standing.has(node.id)
  )
  const across = [...nodes, ...gone]
  return json(
    {
      identity: snapshot.identity,
      parentIdentity: earlier.identity,
      n: across.length,
      nodes: across,
    },
    200
  )
}

const edgesIn = (snapshot: HeldSnapshot, params: URLSearchParams): Response => {
  const type = typesIn(params)
  const from = params.get("from")
  const to = params.get("to")
  const edges = snapshot.graph.edges({
    ...(type === undefined ? {} : { type }),
    ...(from === null ? {} : { from }),
    ...(to === null ? {} : { to }),
  })
  return json({ identity: snapshot.identity, n: edges.length, edges }, 200)
}

const answered = async (url: URL): Promise<Response> => {
  const commit = url.searchParams.get("commit")
  if (commit === null || commit === "") {
    return json({ error: "name the code repository commit to answer about, as `commit`" }, 400)
  }
  const snapshot = await holder.at(commit)
  if (url.pathname === "/nodes") return await nodesIn(snapshot, url.searchParams)
  return edgesIn(snapshot, url.searchParams)
}

type ReachAsk = {
  readonly commit?: unknown
  readonly parent?: unknown
  readonly changedPaths?: unknown
  readonly workflows?: unknown
}

const textsIn = (held: unknown): readonly string[] | undefined => {
  if (!Array.isArray(held)) return undefined
  return held.every((one) => typeof one === "string") ? (held as readonly string[]) : undefined
}

const populationIn = (held: unknown): readonly PopulationEntry[] | undefined => {
  if (!Array.isArray(held)) return undefined
  const asked: PopulationEntry[] = []
  for (const one of held) {
    if (typeof one === "string") {
      asked.push(one)
      continue
    }
    if (typeof one !== "object" || one === null) return undefined
    const { kind, under } = one as { kind?: unknown; under?: unknown }
    if (typeof kind !== "string" || typeof under !== "string") return undefined
    asked.push({ kind, under })
  }
  return asked
}

const workflowIn = (held: unknown): WorkflowSeeds | undefined => {
  if (typeof held !== "object" || held === null) return undefined
  const one = held as Record<string, unknown>
  if (typeof one.name !== "string" || one.name === "") return undefined
  const nodes = one.dispatchNodes === undefined ? [] : textsIn(one.dispatchNodes)
  if (nodes === undefined) return undefined
  const types = one.dispatchNodeTypes === undefined ? [] : populationIn(one.dispatchNodeTypes)
  if (types === undefined) return undefined
  if (one.closurePolicy !== undefined && one.closurePolicy !== "import-graph") return undefined
  return {
    name: one.name,
    ...(one.dispatchNodes === undefined ? {} : { dispatchNodes: nodes }),
    ...(one.dispatchNodeTypes === undefined ? {} : { dispatchNodeTypes: types }),
    ...(one.closurePolicy === undefined ? {} : { closurePolicy: "import-graph" as const }),
  }
}

const workflowsIn = (held: unknown): readonly WorkflowSeeds[] | undefined => {
  if (!Array.isArray(held)) return undefined
  const asked: WorkflowSeeds[] = []
  for (const one of held) {
    const read = workflowIn(one)
    if (read === undefined) return undefined
    asked.push(read)
  }
  return asked
}

const reachedIn = async (request: Request): Promise<Response> => {
  const body = (await request.json()) as ReachAsk
  const commit = typeof body.commit === "string" ? body.commit : ""
  if (commit === "") {
    return json({ error: "name the code repository commit to answer about, as `commit`" }, 400)
  }
  const changedPaths = textsIn(body.changedPaths)
  if (changedPaths === undefined) {
    return json({ error: "`changedPaths` must be an array of repository-relative paths" }, 400)
  }
  const workflows = workflowsIn(body.workflows)
  if (workflows === undefined) {
    return json(
      {
        error:
          "`workflows` must be an array, each naming a `name`, optional `dispatchNodes`, " +
          "optional `dispatchNodeTypes`, and `closurePolicy` of `import-graph` where given",
      },
      400
    )
  }
  const parent = typeof body.parent === "string" && body.parent !== "" ? body.parent : undefined
  const child = await holder.at(commit)
  const earlier = parent === undefined ? undefined : await holder.at(parent)
  const answer = workflowsReached(child.graph, earlier?.graph, { changedPaths, workflows })
  return json(
    {
      identity: child.identity,
      ...(earlier === undefined ? {} : { parentIdentity: earlier.identity }),
      n: answer.workflows.length,
      paths: answer.paths,
      workflows: answer.workflows,
    },
    200
  )
}

const seedSetIn = (one: Record<string, unknown>): SeedSet | undefined => {
  const nodes = one.nodes === undefined ? undefined : textsIn(one.nodes)
  if (one.nodes !== undefined && nodes === undefined) return undefined
  const nodeTypes = one.nodeTypes === undefined ? undefined : populationIn(one.nodeTypes)
  if (one.nodeTypes !== undefined && nodeTypes === undefined) return undefined
  return {
    ...(nodes === undefined ? {} : { nodes }),
    ...(nodeTypes === undefined ? {} : { nodeTypes }),
  }
}

const stepsIn = (held: unknown): readonly SeedSet[] | undefined => {
  if (!Array.isArray(held)) return undefined
  const steps: SeedSet[] = []
  for (const one of held) {
    if (typeof one !== "object" || one === null) return undefined
    const read = seedSetIn(one as Record<string, unknown>)
    if (read === undefined) return undefined
    steps.push(read)
  }
  return steps
}

const sourceIn = (held: unknown): SeedSource | undefined => {
  if (typeof held !== "object" || held === null) return undefined
  const one = held as Record<string, unknown>
  if (typeof one.name !== "string" || one.name === "") return undefined
  if (one.package !== undefined && typeof one.package !== "string") return undefined
  if (one.policy !== undefined && one.policy !== "import-graph") return undefined
  const seeds = seedSetIn(one)
  if (seeds === undefined) return undefined
  const steps = one.steps === undefined ? undefined : stepsIn(one.steps)
  if (one.steps !== undefined && steps === undefined) return undefined
  return {
    name: one.name,
    ...seeds,
    ...(typeof one.package === "string" ? { package: one.package } : {}),
    ...(steps === undefined ? {} : { steps }),
    ...(one.policy === undefined ? {} : { policy: "import-graph" as const }),
  }
}

const seedFilesIn = async (request: Request): Promise<Response> => {
  const body = (await request.json()) as { commit?: unknown; seedSets?: unknown }
  const commit = typeof body.commit === "string" ? body.commit : ""
  if (commit === "") {
    return json({ error: "name the code repository commit to answer about, as `commit`" }, 400)
  }
  if (!Array.isArray(body.seedSets)) {
    return json({ error: "`seedSets` must be an array of seed sets to reach files from" }, 400)
  }
  const sources: SeedSource[] = []
  for (const one of body.seedSets) {
    const read = sourceIn(one)
    if (read === undefined) {
      return json(
        {
          error:
            "each of `seedSets` names a `name`, and optionally `package`, `nodes`, " +
            "`nodeTypes`, `steps`, and a `policy` of `import-graph`",
        },
        400
      )
    }
    sources.push(read)
  }
  const at = await holder.at(commit)
  const answer = seedFilesFor(at.graph, sources)
  return json({ identity: at.identity, n: answer.length, seedSets: answer }, 200)
}

const ASKED: Readonly<Record<string, (request: Request) => Promise<Response>>> = {
  "/workflows-reached": reachedIn,
  "/seed-files": seedFilesIn,
}

const served = async (request: Request): Promise<Response> => {
  const url = new URL(request.url)
  if (url.pathname === "/health") {
    return json({ up: true, built: BUILT, held: holder.held() }, 200)
  }
  const asking = ASKED[url.pathname]
  if (asking !== undefined) {
    if (request.method !== "POST") {
      return json({ error: `\`${url.pathname}\` is asked with a POST carrying JSON` }, 405)
    }
    try {
      return await asking(request)
    } catch (error) {
      return json({ error: error instanceof Error ? error.message : String(error) }, 500)
    }
  }
  if (url.pathname !== "/nodes" && url.pathname !== "/edges") {
    return json(
      {
        error: `no such path: ${url.pathname}`,
        paths: ["/health", "/nodes", "/edges", ...Object.keys(ASKED)],
      },
      404
    )
  }
  try {
    return await answered(url)
  } catch (error) {
    return json({ error: error instanceof Error ? error.message : String(error) }, 500)
  }
}

Bun.serve({ port: REACH.port, idleTimeout: 255, fetch: served })

console.log(`${SAYS} answering on ${REACH.port}, built at ${BUILT}`)
