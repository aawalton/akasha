import { SESSION_SPECS_BY_SLUG } from "../session-points-totals/session-points-totals.module.code.ts"

export const UNAVAILABLE_POINTS_SOURCE_KIND = "unavailable"

export type PointsSourceWriterVerdict =
  | { readonly writer: "engine"; readonly aggregate: string; readonly detail: string }
  | {
      readonly writer: "session-pass"
      readonly pointsProp: string
      readonly rowSourceUnread: boolean
      readonly detail: string
    }
  | { readonly writer: "unavailable"; readonly detail: string }
  | {
      readonly writer: "none"
      readonly rowKind: string
      readonly automated: boolean
      readonly detail: string
    }
  | { readonly writer: "unresolvable"; readonly detail: string }

export interface PointsSourceRowFields {
  readonly slug?: string | undefined
  readonly title?: string | undefined
  readonly pointsSourceKind?: string | undefined
  readonly pointsSourceAggregate?: string | undefined
  readonly pointsSource?: string | undefined
  readonly pointsSourcePointField?: string | undefined
  readonly pointsSourceWeightField?: string | undefined
  readonly pointsPathPrefix?: string | undefined
  readonly pointsPathPrefixes?: readonly string[] | undefined
}

function identityKey(row: PointsSourceRowFields): string {
  return (row.slug ?? row.title ?? "").trim().toLowerCase()
}

function bytesPrefixes(row: PointsSourceRowFields): readonly string[] {
  if (row.pointsPathPrefixes !== undefined && row.pointsPathPrefixes.length > 0) {
    return row.pointsPathPrefixes
  }
  return row.pointsPathPrefix === undefined || row.pointsPathPrefix === ""
    ? []
    : [row.pointsPathPrefix]
}

function resolveWindowed(row: PointsSourceRowFields): PointsSourceWriterVerdict {
  const aggregate = row.pointsSourceAggregate ?? ""
  if (aggregate === "bytes") {
    const prefixes = bytesPrefixes(row)
    if (prefixes.length === 0) {
      return { writer: "unresolvable", detail: "a bytes aggregate naming no path prefix" }
    }
    return { writer: "engine", aggregate, detail: `net bytes written under ${prefixes.join(", ")}` }
  }
  if (aggregate === "sum" || aggregate === "count") {
    const source = row.pointsSource
    if (source === undefined || source === "") {
      return { writer: "unresolvable", detail: `a ${aggregate} aggregate naming no source` }
    }
    return {
      writer: "engine",
      aggregate,
      detail:
        aggregate === "sum"
          ? `sum of ${row.pointsSourcePointField ?? "(no point field)"} over her ${source} rows for the day`
          : `count of her ${source} rows for the day`,
    }
  }
  if (aggregate === "weighted") {
    const source = row.pointsSource
    if (source === undefined || source === "") {
      return { writer: "unresolvable", detail: "a weighted aggregate naming no source" }
    }
    const weightField = row.pointsSourceWeightField
    if (weightField === undefined || weightField === "") {
      return { writer: "unresolvable", detail: "a weighted aggregate naming no weight field" }
    }
    return {
      writer: "engine",
      aggregate,
      detail: `hours of her ${source} intervals for the day, each weighted by its ${weightField}, with an unrated one counted for nothing`,
    }
  }
  return { writer: "unresolvable", detail: "a windowed kind with no readable aggregate" }
}

function resolveExternal(row: PointsSourceRowFields, key: string): PointsSourceWriterVerdict {
  const session = SESSION_SPECS_BY_SLUG[key]
  const source = row.pointsSource
  if (source !== undefined && source !== "") {
    if (session !== undefined) {
      return {
        writer: "session-pass",
        pointsProp: session.pointsPropId,
        rowSourceUnread: true,
        detail: `the session pass claims her by slug and sums ${session.pointsPropId}; her row's source "${source}" is read by nothing`,
      }
    }
    return {
      writer: "unresolvable",
      detail: `no pass here claims the source "${source}", so her points source is silent rather than broken`,
    }
  }
  if (session !== undefined) {
    return {
      writer: "session-pass",
      pointsProp: session.pointsPropId,
      rowSourceUnread: false,
      detail: `the session pass claims her by slug and sums ${session.pointsPropId}`,
    }
  }
  return { writer: "unresolvable", detail: "an external kind naming no source, claimed by no pass" }
}

export function resolvePointsSourceWriter(row: PointsSourceRowFields): PointsSourceWriterVerdict {
  const key = identityKey(row)

  const kind = row.pointsSourceKind
  if (kind === UNAVAILABLE_POINTS_SOURCE_KIND) {
    return {
      writer: "unavailable",
      detail: "she declares that the source her document names does not exist yet",
    }
  }
  if (kind === undefined || kind === "") {
    return { writer: "unresolvable", detail: "her row names no points source kind at all" }
  }
  if (kind === "direct") {
    return {
      writer: "none",
      rowKind: kind,
      automated: true,
      detail: "the Health pillars write her row's points directly",
    }
  }
  if (kind === "seed") {
    return {
      writer: "none",
      rowKind: kind,
      automated: false,
      detail: "her level is a fixed seed rather than an earned total, so nothing meters her",
    }
  }
  if (kind === "manual") {
    return {
      writer: "none",
      rowKind: kind,
      automated: false,
      detail: "her points are hand-managed, so nothing computes what her document names",
    }
  }
  if (kind === "windowed") return resolveWindowed(row)
  if (kind === "stoplights") {
    return {
      writer: "engine",
      aggregate: kind,
      detail:
        "the mean of the colour floor values of the primary stoplights for the day, black counting zero, with her own light settled rather than excluded",
    }
  }
  if (kind === "external") return resolveExternal(row, key)
  if (kind === "delta") {
    return {
      writer: "unresolvable",
      detail:
        "a delta kind, which named no source and relied on a worker pinned to her; no worker is pinned any more, so nothing writes it until her row declares the marker for what she earns from",
    }
  }
  return { writer: "unresolvable", detail: `an unrecognized points source kind "${kind}"` }
}
