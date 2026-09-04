import type { Domain } from "../domains/domain.page-type.ts"

export const code = {
  id: "01a049e9-651c-7001-955c-09de7e27c23e",
  pageTypeSlug: "domain",
  slug: "code",
  definition: "the code a machine runs",
  partSlugs: ["domain/code-audit-ast-unused", "page-type/flag"],
  directives: [
    {
      directiveKind: "rule",
      name: "Bounded Wait",
      act: "Give every wait a ceiling, and fail at that ceiling with the reason the wait was for.",
      warrant:
        "An unbounded wait emits nothing, neither finished nor failed, so nothing alerts and nothing retries.",
      aids: [
        "Bound the whole wait, not each attempt.",
        "Never go on past the ceiling without the result.",
      ],
    },
    {
      directiveKind: "rule",
      name: "Split First",
      act: "Split an authored file too big to read in one answer before you change it, never around it.",
      warrant:
        "A write needs a body read, and no read returns this one, so the two refusals point at each other.",
      aids: ["The split is derived, not authored.", "A part still too big to read is not split."],
    },
    {
      directiveKind: "rule",
      name: "No Code Comments",
      act: "Write a code comment only in one of the code comment forms; delete every other one.",
      warrant:
        "Opus 5 obeys a comment as readily as a domain, so a drifted one competes with what the domains say.",
      aids: [
        "Delete what it said rather than rehome it.",
        "Add it to a domain later, only where needed.",
      ],
    },
    {
      directiveKind: "rule",
      name: "Real Path",
      act: "Resolve a filesystem path to its real location where the path is made.",
      warrant:
        "Two spellings of a path open the same file, so nothing fails until a comparison quietly answers no.",
      aids: [
        "Follow the symlink; `path.resolve` does not.",
        "Where nothing is there yet, resolve the parent.",
      ],
    },
  ],
} as const satisfies Domain
