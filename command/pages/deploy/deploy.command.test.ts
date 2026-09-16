import { afterAll, beforeAll, expect, test } from "bun:test"
import {
  DATA,
  OK,
  OPERATIONAL,
  partWay,
} from "akasha/command/modules/answering/command-answering.module.code.ts"
import type {
  Dispatching,
  PuttingUp,
  Waiting,
  Wanted,
} from "akasha/command/pages/deploy/deploy.command.code.ts"
import {
  deploy as deploying,
  saidOfUnproven,
  stoppedPartWay,
} from "akasha/command/pages/deploy/deploy.command.code.ts"
import { committed, given } from "akasha/command/pages/deploy/deploy.command.test-fixtures.ts"
import { commitAt } from "akasha/command/pages/deploy/modules/commit-naming/deploy-commit-naming.module.code.ts"
import { DEPLOYED_COMMIT } from "akasha/command/pages/deploy/modules/commit-recording/deploy-commit-recording.module.code.ts"
import { IN_CLUSTER } from "akasha/infrastructure/job/modules/run-in-cluster/run-in-cluster.module.code.ts"
import { seededWorld } from "akasha/infrastructure/service/cluster/modules/web-app-reading/web-app-reading.module.test-fixtures.ts"
import {
  ASK_AT,
  type Fetcher,
} from "akasha/page/service/modules/page-calling/page-calling.module.code.ts"

const WORLD = seededWorld()

const SET = "1"

beforeAll(() => {
  process.env[IN_CLUSTER] = SET
})

afterAll(() => {
  delete process.env[IN_CLUSTER]
  WORLD.sweep()
})

async function offTheCluster<T>(act: () => Promise<T>): Promise<T> {
  delete process.env[IN_CLUSTER]
  try {
    return await act()
  } finally {
    process.env[IN_CLUSTER] = SET
  }
}

const HERE = given(committed(WORLD.root))

const NO_WAIT: Waiting = async () => await Promise.resolve(undefined)

function keptAt(commit: string | null = null): Fetcher {
  return (url) => {
    if (url.endsWith(ASK_AT)) {
      const rows = commit === null ? [] : [{ [DEPLOYED_COMMIT]: commit }]
      return Promise.resolve(new Response(JSON.stringify({ rows, n: rows.length })))
    }
    return Promise.resolve(new Response(JSON.stringify({ commit: null, wrote: [], took: [] })))
  }
}

const KEPT: Fetcher = keptAt()

const NO_JOB: Dispatching = () => {
  throw new Error("a job went up in the cluster")
}

const deploy = async (...said: Parameters<typeof deploying>) =>
  await deploying(said[0], said[1], said[2], NO_WAIT, said[4] ?? KEPT, said[5] ?? NO_JOB)

function pastTheChecks(): {
  readonly root: string
  readonly commit: string
  readonly kept: Fetcher
} {
  const world = seededWorld()
  const root = committed(world.root)
  const commit = commitAt(root, null) as string
  return { root, commit, kept: keptAt(commit) }
}

test("a call naming no app is refused as the caller's fault", async () => {
  const answer = await deploy([], HERE)
  expect(answer.code).toBe(1)
  expect(answer.refusals[0]).toContain("<slug>")
  expect(answer.refusals[0]).toContain("nothing said it")
})

test("a call naming two apps is refused rather than chosen between", async () => {
  const answer = await deploy(["one-web", "two-web"], HERE)
  expect(answer.code).toBe(1)
  expect(answer.refusals[0]).toContain("takes 1 word")
  expect(answer.refusals[0]).toContain("2 words")
})

test("a flag this command does not take is refused by name", async () => {
  const answer = await deploy(["one-web", "--again"], HERE)
  expect(answer.code).toBe(1)
  expect(answer.refusals[0]).toContain("`--again`")
})

test("a deploy told to be measured is taken rather than refused as a flag it does not take", async () => {
  const answer = await deploy(["no-such-app-here", "--measured"], HERE)

  expect(answer.code).toBe(2)
})

test("a slug no app page of either kind carries is refused as the data's fault", async () => {
  const answer = await deploy(["no-such-app-here"], HERE)
  expect(answer.code).toBe(2)
  expect(answer.refusals[0]).toContain("no-such-app-here")
  expect(answer.refusals[0]).toContain("web app")
  expect(answer.refusals[0]).toContain("ios app")
})

test("a checkout whose checks will not load puts nothing up", async () => {
  const answer = await deploy(["two-web"], HERE)
  expect(answer.code).toBe(2)
  expect(answer.refusals[0]).toContain("the checks would not load")
  expect(answer.refusals[0]).toContain("two-web")
})

test("a refusal reaching no cluster reports nothing", async () => {
  const answer = await deploy(["no-such-app-here"], HERE)
  expect(answer.report).toEqual([])
})

test("an ios app is found by the short slug its page states", async () => {
  const answer = await deploy(["atlas-ios"], HERE)
  expect(answer.code).toBe(2)
  expect(answer.refusals[0]).toContain("atlas-ios")
})

test("a web app is refused the flag belonging to an ios app", async () => {
  const answer = await deploy(["one-web", "--no-upload"], HERE)
  expect(answer.code).toBe(1)
  expect(answer.refusals[0]).toContain("names a web app")
  expect(answer.refusals[0]).toContain("--no-upload")
})

test("a web app takes a commit rather than being refused one", async () => {
  const answer = await deploy(["one-web", "--ref", "4f2a91c"], HERE)
  expect(answer.refusals[0]).not.toContain("says nothing about it")
})

test("a commit no checkout holds is refused by the name the call gave", async () => {
  const answer = await deploy(["one-web", "--ref", "4f2a91c"], HERE)
  expect(answer.code).toBe(1)
  expect(answer.refusals[0]).toContain("4f2a91c")
})

test("every ios app the mobile commands carry is reached by this command", async () => {
  for (const slug of ["alanwalton", "atlas", "smilingjenny"]) {
    const answer = await deploy([slug, "--ref", "4f2a91c"], HERE)
    expect(answer.refusals[0]).toContain("4f2a91c")
  }
})

test("a commit named is taken off the call rather than read as a second app", async () => {
  const answer = await deploy(["atlas", "--ref", "4f2a91c", "--no-upload"], HERE)
  expect(answer.code).toBe(1)
  expect(answer.refusals[0]).not.toContain("2 words")
  expect(answer.refusals[0]).toContain("4f2a91c")
})

test("a commit named with an equals sign is the same as one named after a space", async () => {
  const answer = await deploy(["atlas", "--ref=origin/change-19458"], HERE)
  expect(answer.code).toBe(1)
  expect(answer.refusals[0]).toContain("origin/change-19458")
})

test("a call naming no commit answers no commit rather than a fixed one", async () => {
  const world = pastTheChecks()
  const seen: Wanted[] = []
  const putting: PuttingUp = async (_read, _slug, _commit, wanted) => {
    seen.push(wanted)
    return await Promise.resolve({ report: [], refusals: [], code: OK })
  }
  await deploy(["one-web"], given(world.root), putting, NO_WAIT, world.kept)
  expect(seen[0]?.ref).toBeNull()
})

test("a commit flag with nothing after it is refused rather than read as a flag", async () => {
  const bare = await deploy(["atlas", "--ref"], HERE)
  expect(bare.code).toBe(1)
  expect(bare.refusals[0]).toContain("takes a value, and none follows it")
  const flagged = await deploy(["atlas", "--ref", "--no-upload"], HERE)
  expect(flagged.refusals[0]).toContain("takes a value, and none follows it")
  const empty = await deploy(["atlas", "--ref="], HERE)
  expect(empty.refusals[0]).toContain("names none")
})

test("a commit named as an empty word is refused rather than read as the head", async () => {
  const answer = await deploy(["atlas", "--ref", ""], HERE)
  expect(answer.code).toBe(1)
  expect(answer.refusals[0]).toContain("names none")
})

test("a commit named twice is refused rather than chosen between", async () => {
  const answer = await deploy(["atlas", "--ref", "one", "--ref", "two"], HERE)
  expect(answer.code).toBe(1)
  expect(answer.refusals[0]).toContain("`--ref` is said twice")
})

test("two places to install to are refused rather than chosen between", async () => {
  const answer = await deploy(["atlas", "--simulator", "--device"], HERE)
  expect(answer.code).toBe(1)
  expect(answer.refusals[0]).toContain("are never said together")
})

const IMAGE = "the image one/web:abc, built and pushed to the registry"

test("a deploy that threw part way names in its refusal what it had put up", async () => {
  const world = pastTheChecks()
  const putting: PuttingUp = (_read, _slug, _commit, _wanted, _given, _restarting, up) => {
    up.push(IMAGE)
    up.push(`${world.commit}, pushed to origin main`)
    throw new Error("kubectl apply was killed")
  }
  const answer = await deploy(["one-web"], given(world.root), putting, NO_WAIT, world.kept)
  expect(answer.code).toBe(3)
  expect(answer.refusals[0]).toContain("kubectl apply was killed")
  expect(answer.refusals[1]).toContain(IMAGE)
  expect(answer.refusals[1]).toContain(`${world.commit}, pushed to origin main`)
  expect(answer.report).toContain(`up\t${IMAGE}`)
})

test("a deploy refused without a throw names in its refusal what it had put up", async () => {
  const world = pastTheChecks()
  const putting: PuttingUp = async (_read, _slug, _commit, _wanted, _given, _restarting, up) => {
    up.push(IMAGE)
    return await Promise.resolve({
      report: [],
      refusals: ["kubectl apply exited 1"],
      code: OPERATIONAL,
    })
  }
  const answer = await deploy(["one-web"], given(world.root), putting, NO_WAIT, world.kept)
  expect(answer.refusals[0]).toContain("kubectl apply exited 1")
  expect(answer.refusals[1]).toContain(IMAGE)
})

test("a deploy refused with nothing put up says nothing about what it put up", async () => {
  const world = pastTheChecks()
  const putting: PuttingUp = async () =>
    await Promise.resolve({
      report: [],
      refusals: ["the recipe names no repository"],
      code: DATA,
    })
  const answer = await deploy(["one-web"], given(world.root), putting, NO_WAIT, world.kept)
  expect(answer.refusals.some((one) => one.includes("stopped part way"))).toBe(false)
})

test("a deploy that threw before anything reached a machine says that rather than saying it may be partial", async () => {
  const world = pastTheChecks()
  const putting: PuttingUp = () => {
    throw new Error("the pinned tree would not open")
  }
  const answer = await deploy(["one-web"], given(world.root), putting, NO_WAIT, world.kept)
  expect(answer.code).toBe(3)
  expect(answer.refusals[1]).toContain("nothing it puts up had reached a machine")
  expect(answer.refusals[1]).not.toContain("may be")
})

test("the refusal names each service with no test proving it runs", () => {
  const said = saidOfUnproven(["one.running.test.ts", "two.running.test.ts"])
  expect(said).toContain("one.running.test.ts")
  expect(said).toContain("two.running.test.ts")
  expect(said).toContain("proves it runs")
})

test("what a deploy put up is named in the refusal rather than counted", () => {
  expect(stoppedPartWay(["one", "two"])).toContain("one; two")
  expect(stoppedPartWay([])).not.toContain("what it put up")
})

test("what a deploy put up is said in the sentence every refusal says it in", () => {
  expect(stoppedPartWay(["one", "two"])).toBe(partWay(["one", "two"])[0] as string)
})

test("a deploy that put nothing up says so, which that sentence does not", () => {
  expect(partWay([])).toEqual([])
  expect(stoppedPartWay([])).toContain("nothing it puts up had reached a machine")
})

const NOWHERE_HERE: PuttingUp = () => {
  throw new Error("the deploy ran on the workstation")
}

test("a web app is sent to the cluster rather than put up on the workstation", async () => {
  const seen: string[] = []
  const dispatching: Dispatching = (root, subject, commit) => {
    seen.push(`${root}\t${subject}\t${commit}`)
    return { said: ["commit\tabc", "up\tone-web"] }
  }
  const answer = await offTheCluster(
    async () => await deploy(["one-web"], HERE, NOWHERE_HERE, NO_WAIT, KEPT, dispatching)
  )
  expect(answer.code).toBe(OK)
  expect(answer.report).toEqual(["commit\tabc", "up\tone-web"])
  expect(seen[0]).toContain("one-web")
})

test("what the run in the cluster would not do refuses the deploy", async () => {
  const dispatching: Dispatching = () => ({ why: "the job deploy-one-web-0123 failed" })
  const answer = await offTheCluster(
    async () => await deploy(["one-web"], HERE, NOWHERE_HERE, NO_WAIT, KEPT, dispatching)
  )
  expect(answer.code).toBe(OPERATIONAL)
  expect(answer.refusals[0]).toContain("deploy-one-web-0123 failed")
})

test("a deploy that is the run in the cluster puts up there rather than sending a second job", async () => {
  const world = pastTheChecks()
  const putting: PuttingUp = async () =>
    await Promise.resolve({ report: ["up\tone-web"], refusals: [], code: OK })
  const answer = await deploy(["one-web"], given(world.root), putting, NO_WAIT, world.kept, NO_JOB)
  expect(answer.code).toBe(OK)
  expect(answer.report).toContain("up\tone-web")
})
