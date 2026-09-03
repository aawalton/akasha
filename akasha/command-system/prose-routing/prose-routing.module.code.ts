import { InputError } from "@akasha/errors-core/exit-code"
import type { FlagValueShape, HelpFlag } from "@tools/ops/surface"

export const PROSE_ROUTE_SUFFIX = "-file"

export interface ProseRouteFlag {
  readonly name: string
  readonly argLabel?: string
  readonly valueShape?: FlagValueShape
  readonly aliases?: readonly string[]
  readonly repeat?: boolean
}

export type RoutedValueShape = "prose" | "line"

function routedShape(flag: ProseRouteFlag): RoutedValueShape | null {
  if (flag.argLabel === undefined) return null
  const shape = flag.valueShape
  return shape === "prose" || shape === "line" ? shape : null
}

const TRAILING_LINE_TERMINATORS = /(?:\r?\n)+$/

const ROUTE_PARSE: { readonly [S in RoutedValueShape]: (text: string) => string } = {
  prose: (text) => text,
  line: (text) => text.replace(TRAILING_LINE_TERMINATORS, ""),
}

export function normalizeRouteValue(text: string, shape: RoutedValueShape): string {
  return ROUTE_PARSE[shape](text)
}

export interface ProseRouteTarget {
  readonly proseFlag: string
  readonly valueShape: RoutedValueShape
}

export interface ProseRouteExpansion<T> {
  readonly flags: readonly (T | HelpFlag)[]
  readonly synthesized: ReadonlyMap<string, ProseRouteTarget>
}

function routeFor(flag: ProseRouteFlag): HelpFlag {
  const route = {
    name: `${flag.name}${PROSE_ROUTE_SUFFIX}`,
    argLabel: "<path|->",
    valueShape: "token",
    acceptsStdin: true,
    path: true,
    description: `Read ${flag.name} from this file, or \`-\` for stdin — the non-shell route for ${flag.name}`,
  } as const
  return flag.repeat === true ? { ...route, repeat: true } : route
}

export function expandProseRoutes<T extends ProseRouteFlag>(
  flags: readonly T[]
): ProseRouteExpansion<T> {
  const taken = new Set<string>()
  for (const flag of flags) {
    taken.add(flag.name)
    for (const alias of flag.aliases ?? []) taken.add(alias)
  }

  const routes: HelpFlag[] = []
  const synthesized = new Map<string, ProseRouteTarget>()
  for (const flag of flags) {
    const valueShape = routedShape(flag)
    if (valueShape === null) continue
    const route = routeFor(flag)
    if (taken.has(route.name)) {
      if (valueShape === "line")
        throw new Error(
          `flag ${flag.name} declares valueShape "line" but ${route.name} is hand-declared — ` +
            `its handler would read the file itself, bypassing the single-line parse`
        )
      continue
    }
    taken.add(route.name)
    routes.push(route)
    synthesized.set(route.name, { proseFlag: flag.name, valueShape })
  }

  if (routes.length === 0) return { flags, synthesized }
  return { flags: [...flags, ...routes], synthesized }
}

export interface ProseRouteRead {
  readonly routeFlag: string
  readonly proseFlag: string
  readonly valueShape: RoutedValueShape
  readonly paths: readonly string[]
}

export function planProseRouteReads(
  synthesized: ReadonlyMap<string, ProseRouteTarget>,
  supplied: ReadonlyMap<string, string | readonly string[] | true>
): readonly ProseRouteRead[] {
  const reads: ProseRouteRead[] = []
  for (const [routeFlag, { proseFlag, valueShape }] of synthesized) {
    const value = supplied.get(routeFlag)
    if (value === undefined || value === true) continue
    if (supplied.get(proseFlag) !== undefined)
      throw new InputError(`${proseFlag}: cannot be set both as ${proseFlag} and ${routeFlag}`)
    reads.push({
      routeFlag,
      proseFlag,
      valueShape,
      paths: typeof value === "string" ? [value] : value,
    })
  }
  return reads
}
