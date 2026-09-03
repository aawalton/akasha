import { MockModuleAttrsSchema } from "../../../../../tools/lib/graph/producers/file/ts-file/parse-mock-module.ts"
import {
  IMPORT_DYNAMIC_EDGE_TYPE,
  IMPORT_STATIC_EDGE_TYPE,
  MOCK_MODULE_EDGE_TYPE,
  RE_EXPORT_EDGE_TYPE,
  TS_FILE_NODE_TYPES,
  tsFileNodeIdToCodeRepoRel,
} from "../../../../../tools/lib/graph/producers/file/ts-file/types.ts"
import {
  ImportStaticAttrsSchema,
  ReExportAttrsSchema,
  TsFileAttrsSchema,
} from "../../../../../tools/lib/graph/producers/file/ts-file/types-schemas.ts"
import type { Graph } from "../../../../../tools/lib/graph/types.ts"
import {
  type DefinerResult,
  makeResolveDefiner,
} from "../reexport-definer/reexport-definer.module.code.ts"
import { computeRuntimeExportSurface } from "../runtime-export-surface/runtime-export-surface.module.code.ts"
import {
  declaredTypeFromPath,
  type TestType,
} from "../test-classification/test-classification.module.code.ts"

const ANY_TEST_RE = /\.test\.tsx?$/

export type Definer = NonNullable<DefinerResult>

export const slotKeyOf = (definer: Definer): string => `${definer.moduleId} ${definer.sourceName}`

export type StubbedSlot = { readonly key: string; readonly definer: Definer }

export type SlotConsumer = { readonly file: string; readonly package: string }

export type MockSite = {
  readonly mockerId: string
  readonly mockerRel: string
  readonly mockerPackage: string | null
  readonly mockerType: TestType | null
  readonly targetId: string
  readonly targetRel: string | null
  readonly line: number
  readonly specifier: string
  readonly objectLiteral: boolean
  readonly stubbedSlots: readonly StubbedSlot[]
}

export type MockLeakContext = {
  readonly graph: Graph
  readonly relById: ReadonlyMap<string, string>
  readonly packageById: ReadonlyMap<string, string>
  readonly packageByRel: ReadonlyMap<string, string>
  readonly testTypeByRel: ReadonlyMap<string, TestType | null>
  readonly sites: readonly MockSite[]
  readonly slotConsumers: ReadonlyMap<string, readonly SlotConsumer[]>
  readonly slotProductionImporters: ReadonlyMap<string, ReadonlySet<string>>
  readonly slotInternalImporters: ReadonlyMap<string, ReadonlyMap<string, ReadonlySet<string>>>
  readonly importAdjacency: ReadonlyMap<string, readonly string[]>
  readonly mockedTargets: ReadonlyMap<string, ReadonlySet<string>>
  readonly stubbedSlotsByTest: ReadonlyMap<string, ReadonlySet<string>>
  readonly populationTestsByPackage: ReadonlyMap<string, readonly string[]>
}

const computeTestOnlyModules = (graph: Graph): ReadonlySet<string> => {
  const importers = new Map<string, Set<string>>()
  for (const edge of graph.edges({ type: [IMPORT_STATIC_EDGE_TYPE, RE_EXPORT_EDGE_TYPE] })) {
    if (tsFileNodeIdToCodeRepoRel(edge.from) === null) continue
    if (tsFileNodeIdToCodeRepoRel(edge.to) === null) continue
    const attrs =
      edge.type === IMPORT_STATIC_EDGE_TYPE
        ? ImportStaticAttrsSchema.parse(edge.attrs)
        : ReExportAttrsSchema.parse(edge.attrs)
    if (attrs.typeOnly) continue
    const set = importers.get(edge.to) ?? new Set<string>()
    set.add(edge.from)
    importers.set(edge.to, set)
  }

  const isTestFile = (id: string): boolean => {
    const rel = tsFileNodeIdToCodeRepoRel(id)
    return rel !== null && ANY_TEST_RE.test(rel)
  }

  const testOnly = new Set<string>()
  for (const [id, froms] of importers) {
    if (isTestFile(id)) continue
    if (froms.size > 0) testOnly.add(id)
  }
  let changed = true
  while (changed) {
    changed = false
    for (const id of testOnly) {
      const froms = importers.get(id) ?? new Set<string>()
      for (const from of froms) {
        if (isTestFile(from) || testOnly.has(from)) continue
        testOnly.delete(id)
        changed = true
        break
      }
    }
  }
  return testOnly
}

export const buildMockLeakContext = (graph: Graph): MockLeakContext => {
  const resolveDefiner = makeResolveDefiner(graph)

  const relById = new Map<string, string>()
  const packageById = new Map<string, string>()
  const packageByRel = new Map<string, string>()
  const populationTestsByPackage = new Map<string, string[]>()
  const typeByRel = new Map<string, TestType | null>()
  for (const node of graph.nodes(TS_FILE_NODE_TYPES)) {
    const rel = tsFileNodeIdToCodeRepoRel(node.id)
    if (rel === null) continue
    const pkg = TsFileAttrsSchema.parse(node.attrs).package
    relById.set(node.id, rel)
    packageById.set(node.id, pkg)
    packageByRel.set(rel, pkg)
    const testType = declaredTypeFromPath(rel)
    typeByRel.set(rel, testType)
    if (testType !== null) {
      const list = populationTestsByPackage.get(pkg) ?? []
      list.push(rel)
      populationTestsByPackage.set(pkg, list)
    }
  }
  const isPopulationTest = (rel: string): boolean => (typeByRel.get(rel) ?? null) !== null

  const testOnlyModules = computeTestOnlyModules(graph)

  const slotConsumers = new Map<string, SlotConsumer[]>()
  const slotProductionImporters = new Map<string, Set<string>>()
  const slotInternalImporters = new Map<string, Map<string, Set<string>>>()
  const importAdjacency = new Map<string, string[]>()

  const addAdjacency = (fromRel: string, toRel: string): undefined => {
    const list = importAdjacency.get(fromRel) ?? []
    list.push(toRel)
    importAdjacency.set(fromRel, list)
  }

  for (const edge of graph.edges({ type: [IMPORT_STATIC_EDGE_TYPE] })) {
    const fromRel = relById.get(edge.from)
    const toRel = relById.get(edge.to)
    if (fromRel === undefined || toRel === undefined) continue
    const attrs = ImportStaticAttrsSchema.parse(edge.attrs)
    if (attrs.typeOnly) continue
    addAdjacency(fromRel, toRel)

    const fromPackage = packageById.get(edge.from)
    const population = isPopulationTest(fromRel)
    const internal = !ANY_TEST_RE.test(fromRel) && !testOnlyModules.has(edge.from)

    for (const sym of attrs.importedSymbols) {
      if (sym === null) continue
      if (sym === "*") {
        if (!population || fromPackage === undefined) continue
        for (const name of computeRuntimeExportSurface(graph, edge.to) ?? []) {
          const definer = resolveDefiner(edge.to, name)
          if (definer === null) continue
          const key = slotKeyOf(definer)
          const list = slotConsumers.get(key) ?? []
          list.push({ file: fromRel, package: fromPackage })
          slotConsumers.set(key, list)
        }
        continue
      }
      const definer = resolveDefiner(edge.to, sym)
      if (definer === null) continue
      const key = slotKeyOf(definer)

      if (population) {
        if (fromPackage === undefined) continue
        const list = slotConsumers.get(key) ?? []
        list.push({ file: fromRel, package: fromPackage })
        slotConsumers.set(key, list)
        continue
      }

      const production = slotProductionImporters.get(key) ?? new Set<string>()
      production.add(fromRel)
      slotProductionImporters.set(key, production)

      if (!internal || fromPackage === undefined || edge.from === definer.moduleId) continue
      const byPackage = slotInternalImporters.get(key) ?? new Map<string, Set<string>>()
      const inPackage = byPackage.get(fromPackage) ?? new Set<string>()
      inPackage.add(fromRel)
      byPackage.set(fromPackage, inPackage)
      slotInternalImporters.set(key, byPackage)
    }
  }

  for (const edge of graph.edges({ type: [IMPORT_DYNAMIC_EDGE_TYPE] })) {
    const fromRel = relById.get(edge.from)
    const toRel = relById.get(edge.to)
    if (fromRel === undefined || toRel === undefined) continue
    addAdjacency(fromRel, toRel)
  }

  const sites: MockSite[] = []
  const mockedTargets = new Map<string, Set<string>>()
  const stubbedSlotsByTest = new Map<string, Set<string>>()

  for (const edge of graph.edges({ type: [MOCK_MODULE_EDGE_TYPE] })) {
    const mockerRel = relById.get(edge.from)
    if (mockerRel === undefined) continue
    const attrs = MockModuleAttrsSchema.parse(edge.attrs)
    const targetRel = relById.get(edge.to) ?? null
    const objectLiteral = attrs.factory.kind === "object-literal"

    const stubbedSlots: StubbedSlot[] = []
    if (attrs.factory.kind === "object-literal" && targetRel !== null) {
      const delegated = new Set(attrs.factory.delegatedKeys)
      for (const key of attrs.factory.factoryKeys) {
        if (delegated.has(key)) continue
        const definer = resolveDefiner(edge.to, key)
        if (definer === null) continue
        stubbedSlots.push({ key, definer })
      }
    }

    const mockerType = typeByRel.get(mockerRel) ?? null
    sites.push({
      mockerId: edge.from,
      mockerRel,
      mockerPackage: packageById.get(edge.from) ?? null,
      mockerType,
      targetId: edge.to,
      targetRel,
      line: attrs.line,
      specifier: attrs.specifier,
      objectLiteral,
      stubbedSlots,
    })

    if (targetRel !== null) {
      const cut = mockedTargets.get(mockerRel) ?? new Set<string>()
      cut.add(targetRel)
      mockedTargets.set(mockerRel, cut)
    }
    if (mockerType !== null && objectLiteral) {
      const own = stubbedSlotsByTest.get(mockerRel) ?? new Set<string>()
      for (const slot of stubbedSlots) own.add(slotKeyOf(slot.definer))
      stubbedSlotsByTest.set(mockerRel, own)
    }
  }

  return {
    graph,
    relById,
    packageById,
    packageByRel,
    testTypeByRel: typeByRel,
    sites,
    slotConsumers,
    slotProductionImporters,
    slotInternalImporters,
    importAdjacency,
    mockedTargets,
    stubbedSlotsByTest,
    populationTestsByPackage,
  }
}
