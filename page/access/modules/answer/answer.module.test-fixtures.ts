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
  }
}

export function depsAsking(ask: PagesDeps["ask"]): PagesDeps {
  return {
    readUser: async () => ({ user: { id: "one" }, headers: new Headers() }),
    mayRead: whenSignedIn,
    ask,
    readPageType: async () => ({ pageTypeId: "one", definitions: [] }),
    definitionsFor: async () => [],
  }
}

export function depsAnonymous(mayRead: PagesDeps["mayRead"]): PagesDeps {
  return {
    readUser: async () => ({ user: null, headers: new Headers() }),
    mayRead,
    ask: async () => ({ rows: [], n: 0 }),
    readPageType: async () => ({ pageTypeId: "one", definitions: [] }),
    definitionsFor: async () => [],
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

export const CARRIED: readonly PropertyDefinition[] = [
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
