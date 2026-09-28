import type {
  PagesDeps,
  PageTypesDeps,
  withDefinitions,
} from "akasha/page/access/modules/answer/answer.module.code.ts"
import type { PropertyDefinition } from "akasha/page/access/modules/page-type-config/page-type-config.module.code.ts"

export const AT = "https://alanwalton.com/api/pages/readout"

export const ROSTER_AT = "https://alanwalton.com/api/page-types"

export const READS_EVERYTHING = { permitted: true, narrows: null } as const

export const READS_NOTHING = { permitted: false } as const

export const whenSignedIn = async (user: object | null) =>
  user === null ? READS_NOTHING : READS_EVERYTHING

export function depsRostering(roster: PageTypesDeps["roster"]): PageTypesDeps {
  return {
    readUser: async () => ({ user: { id: "one" }, headers: new Headers() }),
    mayRead: whenSignedIn,
    roster,
  }
}

export function depsReading(readPageType: PagesDeps["readPageType"]): PagesDeps {
  return {
    readUser: async () => ({ user: { id: "one" }, headers: new Headers() }),
    mayRead: whenSignedIn,
    ask: async () => ({ rows: [], n: 0 }),
    readPageType,
    definitionsFor: async () => [],
    kindsBelow: async () => [],
  }
}

export function depsAsking(ask: PagesDeps["ask"]): PagesDeps {
  return {
    readUser: async () => ({ user: { id: "one" }, headers: new Headers() }),
    mayRead: whenSignedIn,
    ask,
    readPageType: async () => ({ pageTypeId: "one", definitions: [] }),
    definitionsFor: async () => [],
    kindsBelow: async () => [],
  }
}

export function depsKeying(under: (readonly string[] | undefined)[]): PagesDeps {
  return {
    readUser: async () => ({ user: { id: "one" }, headers: new Headers() }),
    mayRead: whenSignedIn,
    ask: async (_pageTypeSlug, _limit, keys) => {
      under.push(keys)
      return { rows: [], n: 0 }
    },
    readPageType: async () => ({ pageTypeId: "one", definitions: CARRIED }),
    definitionsFor: async () => [],
    kindsBelow: async () => [],
  }
}

export function depsTyped(rows: readonly Readonly<Record<string, unknown>>[]): PagesDeps {
  return {
    readUser: async () => ({ user: { id: "one" }, headers: new Headers() }),
    mayRead: whenSignedIn,
    ask: async () => ({ rows, n: rows.length }),
    readPageType: async (slug) => ({ pageTypeId: `${slug}-id`, definitions: [] }),
    definitionsFor: async () => [],
    kindsBelow: async (slug) => [
      ...new Set(
        rows.flatMap((row) => (typeof row.type === "string" && row.type !== slug ? [row.type] : []))
      ),
    ],
  }
}

function definedAs(ids: readonly string[]): readonly PropertyDefinition[] {
  return ids.map((id) => ({ id, title: id, type: "text", pageId: id }))
}

const FILED_TYPES: Readonly<Record<string, readonly PropertyDefinition[]>> = {
  skill: definedAs(["slug", "key", "line"]),
  "scribed-skill": definedAs(["slug", "key", "line", "grimoire"]),
}

const FILED_PAGES: readonly Readonly<Record<string, unknown>>[] = [
  { id: "s", slug: "strike", key: "strike", line: "two-handed", type: "skill" },
  {
    id: "b",
    slug: "fiery-banner",
    key: "fiery-banner",
    line: "support",
    grimoire: "banner",
    type: "scribed-skill",
  },
]

export function depsFiling(asked: (readonly string[] | undefined)[]): PagesDeps {
  return {
    readUser: async () => ({ user: { id: "one" }, headers: new Headers() }),
    mayRead: whenSignedIn,
    ask: async (_pageTypeSlug, _limit, keys) => {
      asked.push(keys)
      const rows = FILED_PAGES.map((page) =>
        keys === undefined
          ? page
          : Object.fromEntries(Object.entries(page).filter(([key]) => keys.includes(key)))
      )
      return { rows, n: rows.length }
    },
    readPageType: async (slug) => {
      const definitions = FILED_TYPES[slug]
      return definitions === undefined ? null : { pageTypeId: `${slug}-id`, definitions }
    },
    definitionsFor: async () => [],
    kindsBelow: async (slug) => (slug === "skill" ? ["scribed-skill"] : []),
  }
}

export const narrowedToOneApp = async () =>
  ({ permitted: true, narrows: [{ key: "app", is: "web-app/one" }] }) as const

export function depsWhere(
  mayRead: PagesDeps["mayRead"],
  asked: (Readonly<Record<string, unknown>> | undefined)[]
): PagesDeps {
  return {
    readUser: async () => ({ user: null, headers: new Headers() }),
    mayRead,
    ask: async (_pageTypeSlug, _limit, _keys, where) => {
      asked.push(where)
      return { rows: [], n: 0 }
    },
    readPageType: async () => ({ pageTypeId: "one", definitions: [] }),
    definitionsFor: async () => [],
    kindsBelow: async () => [],
  }
}

export function depsAnonymous(mayRead: PagesDeps["mayRead"]): PagesDeps {
  return {
    readUser: async () => ({ user: null, headers: new Headers() }),
    mayRead,
    ask: async () => ({ rows: [], n: 0 }),
    readPageType: async () => ({ pageTypeId: "one", definitions: [] }),
    definitionsFor: async () => [],
    kindsBelow: async () => [],
  }
}

export function rowFor(slug: string | null): Parameters<typeof withDefinitions>[0][number] {
  return {
    id: slug ?? "none",
    page_type_id: "one",
    title: null,
    icon: null,
    attributes: { displayName: "To Do" },
    page_type_slug: "page-type",
    unique_key: null,
    status: null,
    completed_at: null,
    slug,
    favorited_at: null,
    last_viewed_at: null,
  }
}

export const DEFINED: readonly PropertyDefinition[] = [
  { id: "toDoDueDate", title: "the day it is due", type: "calendar-date", pageId: "two" },
]

const CARRIED: readonly PropertyDefinition[] = [
  {
    id: "slug",
    title: "Slug",
    type: "text",
    pageId: "one",
    drawnBy: ["text-property", "page-property", "domain", "page"],
  },
  {
    id: "stacks",
    title: "Stacks",
    type: "json",
    pageId: "two",
    drawnBy: ["page-property-entry", "page-property", "domain", "page"],
  },
]
