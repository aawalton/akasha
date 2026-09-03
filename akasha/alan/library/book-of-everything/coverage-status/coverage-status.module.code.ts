import type { ProfileStatus } from "../node-profile/node-profile.module.code.ts"
import { PROPAEDIA_OUTLINE } from "../propaedia-outline/propaedia-outline.module.code.ts"

export function isMeasured(status: ProfileStatus): boolean {
  return status !== "unopened"
}

export interface StatusNode {
  readonly path: string
  readonly label: string
  readonly title: string
  readonly status: ProfileStatus
  readonly children: readonly StatusNode[]
}

export interface MeasuredCount {
  readonly measured: number
  readonly total: number
}

export const CANONICAL_PARTS = PROPAEDIA_OUTLINE.length
export const CANONICAL_DIVISIONS = PROPAEDIA_OUTLINE.reduce((a, p) => a + p.divisions.length, 0)
export const CANONICAL_SECTIONS = PROPAEDIA_OUTLINE.reduce(
  (a, p) => a + p.divisions.reduce((b, d) => b + d.sections.length, 0),
  0
)

export function countMaterialized(node: StatusNode): MeasuredCount {
  let measured = isMeasured(node.status) ? 1 : 0
  let total = 1
  for (const child of node.children) {
    const c = countMaterialized(child)
    measured += c.measured
    total += c.total
  }
  return { measured, total }
}

export function flattenLeaves(node: StatusNode): readonly StatusNode[] {
  if (node.children.length === 0) return [node]
  return node.children.flatMap(flattenLeaves)
}

export function countMeasuredSections(node: StatusNode, depthFromRoot: number): number {
  if (depthFromRoot === 3) return isMeasured(node.status) ? 1 : 0
  if (depthFromRoot > 3) return 0
  let measured = 0
  for (const child of node.children) {
    measured += countMeasuredSections(child, depthFromRoot + 1)
  }
  return measured
}

export interface DivisionCoverage {
  readonly partTitle: string
  readonly title: string
  readonly sections: MeasuredCount
  readonly materialized: MeasuredCount
}

export interface PartCoverage {
  readonly title: string
  readonly sections: MeasuredCount
  readonly materialized: MeasuredCount
}

export interface CoverageReport {
  readonly sectionHeadline: MeasuredCount
  readonly materializedDetail: MeasuredCount
  readonly parts: readonly PartCoverage[]
  readonly divisions: readonly DivisionCoverage[]
}

export function buildCoverageReport(root: StatusNode): CoverageReport {
  const parts: PartCoverage[] = []
  const divisions: DivisionCoverage[] = []

  PROPAEDIA_OUTLINE.forEach((outlinePart, pi) => {
    const diskPart = root.children[pi]
    const partSectionsTotal = outlinePart.divisions.reduce((a, d) => a + d.sections.length, 0)
    const partSectionsMeasured = diskPart === undefined ? 0 : countMeasuredSections(diskPart, 1)
    parts.push({
      title: diskPart?.title ?? outlinePart.title,
      sections: { measured: partSectionsMeasured, total: partSectionsTotal },
      materialized:
        diskPart === undefined ? { measured: 0, total: 0 } : countMaterialized(diskPart),
    })

    outlinePart.divisions.forEach((outlineDiv, di) => {
      const diskDiv = diskPart?.children[di]
      const divSectionsMeasured = diskDiv === undefined ? 0 : countMeasuredSections(diskDiv, 2)
      divisions.push({
        partTitle: diskPart?.title ?? outlinePart.title,
        title: diskDiv?.title ?? outlineDiv.title,
        sections: { measured: divSectionsMeasured, total: outlineDiv.sections.length },
        materialized:
          diskDiv === undefined ? { measured: 0, total: 0 } : countMaterialized(diskDiv),
      })
    })
  })

  return {
    sectionHeadline: { measured: countMeasuredSections(root, 0), total: CANONICAL_SECTIONS },
    materializedDetail: countMaterialized(root),
    parts,
    divisions,
  }
}

export function coveragePercent(count: MeasuredCount): number {
  if (count.total === 0) return 0
  return (count.measured / count.total) * 100
}
