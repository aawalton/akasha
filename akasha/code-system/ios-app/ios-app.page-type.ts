import type { Domain } from "../../domain-system/domain/domain.page-type.ts"
import type { PageType } from "../../pages-system/page-type/page-type.page-type.ts"
import type { ComponentSlugs } from "./properties/component-slugs.relation-property.ts"

export type IosApp = Domain & {
  componentSlugs: ComponentSlugs
}

export const iosApp = {
  id: "01a05821-5723-7e65-88e2-045d3e49cb23",
  pageTypeSlug: "page-type",
  slug: "ios-app",
  definition: "the app on a phone and the shell it runs in",
  pluralSlug: "ios-apps",
  partSlugs: ["ios-app/alanwalton", "ios-app/smilingjenny", "relation-property/component-slugs"],
  extendsSlug: "page-type/domain",
  properties: [{ pagePropertySlug: "component-slugs", required: true, many: true, max: null }],
  invariants: [
    {
      invariantKind: "departure",
      statement: "An app names every component its widget extension compiles.",
    },
    {
      invariantKind: "departure",
      statement: "A component named by more than one app is a shared one.",
    },
    {
      invariantKind: "departure",
      statement: "Swift names no imports between the files of one extension.",
    },
    {
      invariantKind: "constraint",
      statement: "A component no app names is compiled into nothing.",
    },
  ],
} as const satisfies PageType
