import type { NodeId } from "@akasha/workflow-language/workflow-types"
export const TEST_TYPES = ["unit", "property", "component"] as const
export type TestType = (typeof TEST_TYPES)[number]

export const TEST_ESCAPE_HATCH_DISPATCH_NODES: readonly NodeId[] = [
  "json-file:code:tsconfig.json",
  "json-file:code:tsconfig.base.json",
  "json-file:code:biome.json",
]

export interface TestStep {
  testType: TestType
  name: string
  testBearingRoots: readonly string[]
  dispatchNodes: readonly NodeId[]
}

const packageSeedId = (pkgName: string): NodeId => `package:code:${pkgName}`

export function detectTestType(file: string): TestType | undefined {
  for (const t of TEST_TYPES) {
    if (file.endsWith(`.${t}.test.ts`) || file.endsWith(`.${t}.test.tsx`)) return t
  }
  return undefined
}

export function groupTestFilesByType(
  testFiles: readonly string[]
): Record<TestType, readonly string[]> {
  const buckets: Record<TestType, string[]> = {
    unit: [],
    property: [],
    component: [],
  }
  for (const f of testFiles) {
    const type = detectTestType(f)
    if (type === undefined) continue
    buckets[type].push(f)
  }
  return {
    unit: [...buckets.unit].sort(),
    property: [...buckets.property].sort(),
    component: [...buckets.component].sort(),
  }
}

export function generateTestSteps(params: {
  testsByType: Record<TestType, readonly string[]>
  workspaceRoots: readonly string[]
  closure: Map<string, Set<string>>
  rootToName: Map<string, string>
}): readonly TestStep[] {
  const { testsByType, workspaceRoots, closure, rootToName } = params
  const steps: TestStep[] = []
  for (const testType of TEST_TYPES) {
    const files = testsByType[testType]
    if (files.length === 0) continue

    const bearingRoots = findTestBearingRoots(files, workspaceRoots).filter((r) => {
      const name = rootToName.get(r)
      return name !== undefined && name !== ""
    })
    if (bearingRoots.length === 0) continue

    const seedNames = new Set<string>()
    for (const root of bearingRoots) {
      const deps = closure.get(root) ?? new Set<string>([root])
      for (const dep of deps) {
        const name = rootToName.get(dep)
        if (name === undefined || name === "") continue
        seedNames.add(name)
      }
    }
    const dispatchNodes: NodeId[] = [
      ...[...seedNames].sort().map(packageSeedId),
      ...TEST_ESCAPE_HATCH_DISPATCH_NODES,
    ]
    steps.push({
      testType,
      name: `${testType}-tests`,
      testBearingRoots: bearingRoots,
      dispatchNodes,
    })
  }
  return steps
}

export function findTestBearingRoots(
  testFiles: readonly string[],
  workspaceRoots: readonly string[]
): readonly string[] {
  const sortedRoots = [...workspaceRoots].sort((a, b) => b.length - a.length)
  const bearing = new Set<string>()
  for (const file of testFiles) {
    for (const root of sortedRoots) {
      if (root === "" ? file.includes("/") : file === root || file.startsWith(`${root}/`)) {
        bearing.add(root)
        break
      }
    }
  }
  return [...bearing].sort()
}
