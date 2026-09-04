import type { NamedSet } from "../markdown-property-stating/markdown-property-stating.module.code.ts"

/**
 * The names a `type:` may hold, stated here rather than read from pages at runtime.
 *
 * These were pages under `pages/page-property-type/`, read through the page type that claimed
 * them. That page type has been ablated, so the folder names nothing and the vocabulary resolved
 * to nothing — a validator that cannot say what it enforces. Stating the vocabulary in code is
 * what the markdown pages system is being replaced by, so pinning it here is the migration rather
 * than a workaround for it.
 *
 * Every name `RULES` in `value.ts` states a rule for stands here, so the refusal lists what the
 * checker can build. `file`, `none`, `region` and `size` are resolved in code and never had a page
 * in that folder, so a set copied from the folder alone drops them: `none` is named by ten
 * definitions, `file` by two and `size` by one.
 *
 * `select` is absent because nothing names it. Every one of the 82 uses is parameterised as
 * `select(of)`, and `nameOf` unwraps those to the inner name, so a bare `select` never reaches
 * this set. Admitting one would widen the grammar to a type `RULES` states no rule for.
 */
export const TYPE_NAMES: ReadonlySet<string> = new Set([
  "boolean",
  "calendar-date",
  "color",
  "file",
  "instant",
  "json",
  "list",
  "lower-kebab-case",
  "map",
  "none",
  "number",
  "pages",
  "path",
  "process",
  "reading",
  "region",
  "relation-address",
  "relation-id",
  "relation-name",
  "relation-seq",
  "relation-slug",
  "size",
  "step-definition",
  "temper-grimoire-script",
  "temper-metric-effect",
  "template",
  "text",
  "url",
  "uuid",
])

/** What each name is, which is how a record type's fields are looked for. */
export const TYPE_KINDS: ReadonlyMap<string, string> = new Map([
  ["boolean", "primitive"],
  ["calendar-date", "primitive"],
  ["color", "select"],
  ["file", "primitive"],
  ["instant", "primitive"],
  ["json", "primitive"],
  ["list", "composite"],
  ["lower-kebab-case", "primitive"],
  ["map", "composite"],
  ["none", "primitive"],
  ["number", "primitive"],
  ["pages", "composite"],
  ["path", "primitive"],
  ["process", "primitive"],
  ["reading", "record"],
  ["region", "primitive"],
  ["relation-address", "primitive"],
  ["relation-id", "primitive"],
  ["relation-name", "primitive"],
  ["relation-seq", "primitive"],
  ["relation-slug", "primitive"],
  ["size", "primitive"],
  ["step-definition", "record"],
  ["temper-grimoire-script", "record"],
  ["temper-metric-effect", "record"],
  ["template", "primitive"],
  ["text", "primitive"],
  ["url", "primitive"],
  ["uuid", "primitive"],
])

/** The values a named set admits. `color` is the only one. */
export const TYPE_SETS: ReadonlyMap<string, NamedSet> = new Map([
  [
    "color",
    {
      of: "lower-kebab-case",
      stated: {
        pattern: null,
        backstop: null,
        values: ["green", "blue", "purple", "yellow", "orange", "red"],
        max: null,
      },
    },
  ],
])
