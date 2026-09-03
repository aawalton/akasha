export interface ColorAllowlistEntry {
  readonly path: string
  readonly values: readonly [string, ...(readonly string[])]
  readonly reason: string
}

export const COLOR_LITERAL_ALLOWLIST: readonly ColorAllowlistEntry[] = [
  {
    path: "akasha/alan/web/alan-nav-icon-svg/alan-nav-icon-svg.module.code.ts",
    values: ["oklch(0.63 0.13 73)"],
    reason:
      "Alan grant 2026-07-02: --yellow mirror in standalone serialized SVG favicon documents; page CSS vars cannot cascade in.",
  },
  {
    path: "akasha/web-page-answers/nav-icon-svg/nav-icon-svg.module.code.ts",
    values: ["oklch(0.63 0.13 73)"],
    reason:
      "Alan grant 2026-07-02: --yellow mirror in standalone serialized SVG favicon documents; page CSS vars cannot cascade in.",
  },
  {
    path: "akasha/alan/atlas-web/atlas-nav-icon-svg/atlas-nav-icon-svg.module.code.ts",
    values: ["oklch(0.63 0.13 73)"],
    reason:
      "Alan grant 2026-07-02: --yellow mirror in standalone serialized SVG favicon documents; page CSS vars cannot cascade in.",
  },
  {
    path: "akasha/alan/atlas-web/location-map/location-map.module.code.tsx",
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

export const RULE_HOME_PATH =
  "akasha/checks/cluster-checks/modules/color-literal-grants/color-literal-grants.module.code.ts"
