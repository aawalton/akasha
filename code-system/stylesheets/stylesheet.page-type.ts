import type { Domain } from "@akasha/domain-system/domain"
import type { PageType } from "@akasha/pages-system/page-type"
import type { Styles } from "./properties/styles.file-property.ts"

export type Stylesheet = Domain & {
  styles: Styles
}

export const stylesheet = {
  id: "01a05b01-48b1-72b3-961d-f31190becdc7",
  pageTypeSlug: "page-type",
  slug: "stylesheet",
  definition: "the rules a browser dresses something by",
  pluralSlug: "stylesheets",
  partSlugs: ["file-property/styles"],
  extendsSlug: ["page-type/domain"],
  properties: [{ pagePropertySlug: "styles", required: true, many: false }],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A stylesheet's rules are a page property held in a file beside the page.",
    },
    {
      invariantKind: "departure",
      statement:
        "A stylesheet is its own page rather than a property of what the stylesheet dresses.",
    },
    {
      invariantKind: "departure",
      statement: "One stylesheet dresses as many components as name the stylesheet's classes.",
    },
    {
      invariantKind: "departure",
      statement: "A component is dressed by naming a class rather than by importing a stylesheet.",
    },
    {
      invariantKind: "departure",
      statement: "A component imports a stylesheet only to make a bundler emit the stylesheet.",
    },
    {
      invariantKind: "departure",
      statement: "A stylesheet page states what its rules dress.",
    },
    {
      invariantKind: "departure",
      statement: "A stylesheet is formatted and linted by the run that reads a body of code.",
    },
    {
      invariantKind: "departure",
      statement: "A stylesheet is held to the same byte ceiling as any other file.",
    },
    {
      invariantKind: "absence",
      statement: "A stylesheet declares nothing a compiler could type.",
    },
    {
      invariantKind: "absence",
      statement: "A stylesheet imports nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A comment in a stylesheet is refused as prose in code is.",
    },
    {
      invariantKind: "gap",
      statement: "A specifier naming a stylesheet that is not there is refused by the typechecker.",
    },
  ],
} as const satisfies PageType
