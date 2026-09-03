import type { Domain } from "../domain-system/domains/domain.page-type.ts"

export const design = {
  id: "01a05b55-a539-7a1c-9bdc-5a459722f028",
  pageTypeSlug: "domain",
  slug: "design",
  definition: "how a thing is drawn on a screen and worked by hand",
  partSlugs: [
    "workspace-package/design-badges",
    "workspace-package/design-forms",
    "workspace-package/design-layout",
    "workspace-package/design-patterns",
    "workspace-package/design-primitives",
    "workspace-package/design-system",
    "workspace-package/design-tokens",
    "page-type/color",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "Every design package is in akasha.",
    },
  ],
  directives: [
    {
      directiveKind: "principle",
      name: "Nothing Unexplained",
      act: "Give every difference a reader can see a reason they can find.",
      warrant:
        "A difference with no reason reads as one the reader missed, so they watch for it and stop reading.",
      aids: [
        "Never give one look to two things that differ.",
        "Explain nothing to a reader who knows the design.",
      ],
    },
    {
      directiveKind: "rule",
      name: "Share An Edge",
      act: "Line each element up with an edge already placed.",
      warrant:
        "The eye finds an edge nobody drew, so a layout has edges whether or not anyone chose them.",
      aids: [
        "Never centre an element and call it aligned.",
        "The first element takes no edge; choose one.",
      ],
    },
    {
      directiveKind: "principle",
      name: "Obvious Or None",
      act: "Make a difference obvious, or make none at all.",
      warrant:
        "A difference costs a reader's attention whether or not it is big enough for them to see it.",
      aids: [
        "Judge a difference with the two things apart.",
        "Remove a difference you will not make obvious.",
      ],
    },
    {
      directiveKind: "rule",
      name: "Color Earns Attention",
      act: "Prefer the uncolored expression of a value unless the color names a semantic category.",
      warrant:
        "A hue is seen before anything is read, so adding one takes attention from everything else.",
      aids: [
        "Never color a value to show it matters.",
        "Name the category in text as well as in color.",
      ],
    },
    {
      directiveKind: "rule",
      name: "Failure Is Boring",
      act: "Render an error at the weight of any other state the reader must act on, never at an alarm's.",
      warrant:
        "A reader finds the failure anyway, so extra weight buys nothing and is charged on every render.",
      aids: [
        "Do not make an error so quiet readers miss it.",
        "Word an error like every other message.",
      ],
    },
  ],
} as const satisfies Domain
