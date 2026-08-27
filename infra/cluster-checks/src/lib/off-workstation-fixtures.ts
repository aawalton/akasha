import { createEngine } from "../../../../../instructions/tools/lib/graph/engine.ts"
import type { EdgeInit, Graph, NodeInit } from "../../../../../instructions/tools/lib/graph/types.ts"
import type { ReachPolicy } from "./off-workstation-reach"

const FIXTURE_COMMIT = "0".repeat(40)

export const RUNTIME_ONLY: ReachPolicy = { includeDevDependencies: false }
export const WITH_DEV: ReachPolicy = { includeDevDependencies: true }

export type Fixture = {
  readonly packages: readonly string[]
  readonly packageDirs?: Readonly<Record<string, string>>
  readonly contains: readonly (readonly [string, string])[]
  readonly files?: readonly string[]
  readonly depends?: readonly (readonly [string, string, string])[]
  readonly imports?: readonly (readonly [string, string, boolean?])[]
  readonly workflows?: readonly (readonly [string, string, string?, (readonly string[])?])[]
  readonly k8s?: readonly (readonly [string, string, (readonly string[])?])[]
  readonly steps?: readonly (readonly [string, string, string?])[]
  readonly dockerfileRecipes?: readonly (readonly [
    string,
    readonly (readonly [string, string])[],
  ])[]
  readonly dockerfileRecipeOutputs?: readonly (readonly [string, string])[]
}

export const buildFixture = async (fixture: Fixture): Promise<Graph> => {
  const engine = createEngine()
  engine.registerNodeType({ name: "package" })
  engine.registerNodeType({ name: "ts-file" })
  engine.registerNodeType({ name: "yaml-file" })
  engine.registerNodeType({ name: "workflow" })
  engine.registerNodeType({ name: "k8s-resource" })
  engine.registerNodeType({ name: "step" })
  engine.registerNodeType({ name: "json-file" })
  engine.registerNodeType({ name: "sh-file" })
  engine.registerNodeType({ name: "dockerfile-recipe" })
  engine.registerEdgeType({ name: "pkg-contains-file", from: "package", to: "package" })
  engine.registerEdgeType({ name: "pkg-depends", from: "package", to: "package" })
  engine.registerEdgeType({ name: "import-static", from: "ts-file", to: "ts-file" })
  engine.registerEdgeType({
    name: "dockerfile-recipe-input",
    from: "dockerfile-recipe",
    to: "package",
  })
  engine.registerEdgeType({
    name: "dockerfile-recipe-output",
    from: "dockerfile-recipe",
    to: "package",
  })

  engine.registerProducer({
    name: "fixture",
    nodeTypes: [
      "package",
      "ts-file",
      "yaml-file",
      "json-file",
      "workflow",
      "k8s-resource",
      "step",
      "dockerfile-recipe",
    ],
    edgeTypes: [
      "pkg-contains-file",
      "pkg-depends",
      "import-static",
      "dockerfile-recipe-input",
      "dockerfile-recipe-output",
    ],
    build: () => {
      const nodes: NodeInit[] = []
      const edges: EdgeInit[] = []
      for (const name of fixture.packages) {
        const dir = fixture.packageDirs?.[name]
        nodes.push({
          type: "package",
          repo: "code",
          key: name,
          attrs: {
            name,
            ...(dir === undefined ? {} : { path: dir }),
          },
        })
      }
      const fileType = (path: string): string => {
        if (path.endsWith(".yaml")) return "yaml-file"
        if (path.endsWith(".json")) return "json-file"
        if (path.endsWith(".sh")) return "sh-file"
        return "ts-file"
      }
      const seenFile = new Set<string>()
      const addFile = (path: string): undefined => {
        if (seenFile.has(path)) return
        seenFile.add(path)
        nodes.push({ type: fileType(path), repo: "code", key: path, attrs: { path } })
      }
      for (const path of fixture.files ?? []) addFile(path)
      for (const [pkg, path] of fixture.contains) {
        addFile(path)
        edges.push({
          type: "pkg-contains-file",
          from: `package:code:${pkg}`,
          to: `${fileType(path)}:code:${path}`,
          attrs: {},
        })
      }
      for (const [from, to, kind] of fixture.depends ?? []) {
        edges.push({
          type: "pkg-depends",
          from: `package:code:${from}`,
          to: `package:code:${to}`,
          attrs: { kind },
        })
      }
      for (const [from, to, typeOnly] of fixture.imports ?? []) {
        addFile(from)
        addFile(to)
        edges.push({
          type: "import-static",
          from: `ts-file:code:${from}`,
          to: `ts-file:code:${to}`,
          attrs: { typeOnly: typeOnly ?? false },
        })
      }
      for (const [name, sourcePath, declared, dispatchNodes] of fixture.workflows ?? []) {
        nodes.push({
          type: "workflow",
          repo: "code",
          key: name,
          attrs: {
            name,
            sourcePath,
            ...(declared === undefined ? {} : { package: declared }),
            ...(dispatchNodes === undefined ? {} : { dispatchNodes: [...dispatchNodes] }),
          },
        })
      }
      for (const [workflow, name, script] of fixture.steps ?? []) {
        nodes.push({
          type: "step",
          repo: "code",
          key: `${workflow}:${name}`,
          attrs: {
            name,
            workflow,
            image: "bun",
            dependsOnSteps: [],
            ...(script === undefined ? {} : { script }),
          },
        })
      }
      for (const [name, inputs] of fixture.dockerfileRecipes ?? []) {
        nodes.push({
          type: "dockerfile-recipe",
          key: name,
          attrs: { name },
        })
        for (const [path, kind] of inputs) {
          addFile(path)
          edges.push({
            type: "dockerfile-recipe-input",
            from: `dockerfile-recipe:${name}`,
            to: `${fileType(path)}:code:${path}`,
            attrs: { kind },
          })
        }
      }
      for (const [name, path] of fixture.dockerfileRecipeOutputs ?? []) {
        addFile(path)
        edges.push({
          type: "dockerfile-recipe-output",
          from: `dockerfile-recipe:${name}`,
          to: `${fileType(path)}:code:${path}`,
          attrs: {},
        })
      }
      for (const [id, path, repoPaths] of fixture.k8s ?? []) {
        nodes.push({
          type: "k8s-resource",
          repo: "code",
          key: id,
          attrs: { path, repoPaths: repoPaths ?? [] },
        })
      }
      return { nodes, edges }
    },
  })

  return engine.build({ repoRoots: new Map(), repoFiles: new Map(), commit: FIXTURE_COMMIT })
}
