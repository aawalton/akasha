import type { Domain } from "@akasha/domain-system/domain"
import type { PageType } from "@akasha/pages-system/page-type"
import type { BundleId } from "../ios-apps/properties/bundle-id.text-property.ts"
import type { ComponentSlugs } from "./properties/component-slugs.relation-property.ts"
import type { Entitlements } from "./properties/entitlements.file-property.ts"
import type { InfoPlist } from "./properties/info-plist.file-property.ts"
import type { Main } from "./properties/main.named-file-property.ts"
import type { ProfileName } from "./properties/profile-name.text-property.ts"
import type { TargetName } from "./properties/target-name.text-property.ts"

export type IosProgram = Domain & {
  bundleId?: BundleId
  componentSlugs?: ComponentSlugs
  profileName?: ProfileName
  targetName?: TargetName
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
    "ios-program/alanwalton-decode-harness",
    "ios-program/alanwalton-widget",
    "ios-program/smilingjenny-app",
    "ios-program/smilingjenny-decode-harness",
    "ios-program/smilingjenny-widget",
    "named-file-property/main",
    "relation-property/component-slugs",
    "text-property/profile-name",
    "text-property/target-name",
  ],
  extendsSlug: ["page-type/domain"],
  properties: [
    { pagePropertySlug: "bundle-id", required: false, many: false },
    { pagePropertySlug: "component-slugs", required: false, many: true, max: null },
    { pagePropertySlug: "profile-name", required: false, many: false },
    { pagePropertySlug: "target-name", required: false, many: false },
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
      statement: "A program names every component that program compiles.",
    },
    {
      invariantKind: "departure",
      statement: "A component named by more than one program is a shared one.",
    },
    {
      invariantKind: "constraint",
      statement: "A component no program names is compiled into nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A program Apple signs states the profile that program is signed against.",
    },
    {
      invariantKind: "departure",
      statement:
        "A program shipped apart from the app that carries that program states its own name.",
    },
  ],
} as const satisfies PageType
