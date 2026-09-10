import type { PageType } from "akasha/pages/types/page-type.page-type.types.ts"

export const supervisor = {
  id: "01a08c6e-7967-7332-92d1-3b2e9425d7f9",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "supervisor",
  definition: "a supervisor at work for one agent",
  pluralSlug: "supervisors",
  extends: ["page-type/page"],
  mortal: true,
  parts: [
    "file-property/console",
    "file-property/presence",
    "file-property/proxy-console",
    "file-property/proxy-errors",
  ],
  properties: [
    {
      pageProperty: "file-property/console",
      required: false,
      many: false,
      uncommitted: true,
      default: "log",
    },
    {
      pageProperty: "file-property/proxy-console",
      required: false,
      many: false,
      uncommitted: true,
      default: "log",
    },
    {
      pageProperty: "file-property/proxy-errors",
      required: false,
      many: false,
      uncommitted: true,
      default: "log",
    },
    {
      pageProperty: "file-property/presence",
      required: false,
      many: false,
      uncommitted: true,
      default: "log",
    },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A supervisor's slug is the id of the agent that supervisor minds.",
    },
    {
      invariantKind: "departure",
      statement: "A supervisor is a page of its own rather than a set of keys on the seat.",
    },
    {
      invariantKind: "departure",
      statement: "Renaming a seat moves that seat's page and leaves its supervisor where it is.",
    },
    {
      invariantKind: "departure",
      statement: "A supervisor names its own page from the agent id alone, reading no seat.",
    },
    {
      invariantKind: "departure",
      statement: "The page is committed and the files beside that page are not.",
    },
    {
      invariantKind: "departure",
      statement: "Removing the page removes those files with that page.",
    },
    {
      invariantKind: "absence",
      statement: "No socket sits beside this page.",
    },
    {
      invariantKind: "departure",
      statement: "A socket is a path the kernel binds rather than a body akasha keeps.",
    },
  ],
  types: "ts",
} as const satisfies PageType
