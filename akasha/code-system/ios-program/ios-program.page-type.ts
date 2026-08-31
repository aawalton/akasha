import type { Domain } from "../../domain-system/domain/domain.page-type.ts"
import type { PageType } from "../../pages-system/page-type/page-type.page-type.ts"
import type { ComponentSlugs } from "./properties/component-slugs.relation-property.ts"
import type { Entitlements } from "./properties/entitlements.file-property.ts"
import type { InfoPlist } from "./properties/info-plist.file-property.ts"
import type { Main } from "./properties/main.named-file-property.ts"

export type IosProgram = Domain & {
  componentSlugs?: ComponentSlugs
  main?: Main
  infoPlist?: InfoPlist
  entitlements?: Entitlements
}

export const iosProgram = {
  id: "01a05901-26b3-7d1b-aec6-3b467f5f5b8d",
  pageTypeSlug: "page-type",
  slug: "ios-program",
  definition: "one thing an iOS package builds",
  pluralSlug: "ios-programs",
  partSlugs: [
    "file-property/entitlements",
    "file-property/info-plist",
    "ios-program/alanwalton-app",
    "ios-program/alanwalton-widget",
    "ios-program/smilingjenny-app",
    "ios-program/smilingjenny-widget",
    "named-file-property/main",
    "relation-property/component-slugs",
  ],
  extendsSlug: "page-type/domain",
  properties: [
    { pagePropertySlug: "component-slugs", required: false, many: true, max: null },
    { pagePropertySlug: "main", required: false, many: false },
    { pagePropertySlug: "info-plist", required: false, many: false },
    { pagePropertySlug: "entitlements", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A program's top level statements stand in the file named main.swift.",
    },
    {
      invariantKind: "departure",
      statement: "Swift names no imports between the files of one program.",
    },
    {
      invariantKind: "departure",
      statement: "A seam copies a program's files to the names Xcode reads.",
    },
    {
      invariantKind: "departure",
      statement: "A program names every component it compiles.",
    },
    {
      invariantKind: "departure",
      statement: "A component named by more than one program is a shared one.",
    },
    {
      invariantKind: "constraint",
      statement: "A component no program names is compiled into nothing.",
    },
  ],
} as const satisfies PageType
