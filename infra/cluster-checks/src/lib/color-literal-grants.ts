export interface ColorAllowlistEntry {
  readonly path: string
  readonly values: readonly [string, ...(readonly string[])]
  readonly reason: string
}

export const COLOR_LITERAL_ALLOWLIST: readonly ColorAllowlistEntry[] = [
  {
    path: "alanwalton/web/app/lib/nav-icon-svg.ts",
    values: ["oklch(0.63 0.13 73)"],
    reason:
      "Alan grant 2026-07-02: --yellow mirror in standalone serialized SVG favicon documents; page CSS vars cannot cascade in.",
  },
  {
    path: "temper/web/app/lib/nav-icon-svg.ts",
    values: ["oklch(0.63 0.13 73)"],
    reason:
      "Alan grant 2026-07-02: --yellow mirror in standalone serialized SVG favicon documents; page CSS vars cannot cascade in.",
  },
  {
    path: "archive-of-worlds/web/app/lib/nav-icon-svg.ts",
    values: ["oklch(0.63 0.13 73)"],
    reason:
      "Alan grant 2026-07-02: --yellow mirror in standalone serialized SVG favicon documents; page CSS vars cannot cascade in.",
  },
  {
    path: "alanwalton/atlas-web/app/lib/nav-icon-svg.ts",
    values: ["oklch(0.63 0.13 73)"],
    reason:
      "Alan grant 2026-07-02: --yellow mirror in standalone serialized SVG favicon documents; page CSS vars cannot cascade in.",
  },
  {
    path: "alanwalton/atlas-web/app/components/location-map.tsx",
    values: ["#e6e4df"],
    reason:
      "Alan grant 2026-07-02: MapLibre background layer matching the external OSM tile ground color; semantics external to the palette.",
  },
]

export function normalizeLiteral(value: string): string {
  return value.trim().toLowerCase().replace(/\s+/g, " ")
}

export const GRANTED_VALUES_BY_PATH: ReadonlyMap<string, ReadonlySet<string>> = new Map(
  COLOR_LITERAL_ALLOWLIST.map((entry) => [entry.path, new Set(entry.values.map(normalizeLiteral))])
)

export const RULE_HOME_PATH = "infra/cluster-checks/src/lib/color-literal-grants.ts"
