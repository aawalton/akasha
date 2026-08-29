import type { Finding } from "../finding.page-type.ts"

export const noCommandTellsItsOwnSurface = {
  id: "01a04d4d-aedd-75d8-ba75-d1c4bc6e5d19",
  pageTypeSlug: "finding",
  slug: "no-command-tells-its-own-surface",
  domainSlug: "domain/command-system",
  claim:
    "No command answers a request for help, so the only way to learn what a command takes is to read its code.",
  evidence:
    "Every command refuses an unknown flag rather than ignoring it, which is right, and help is an unknown flag to all five, so asking for it earns a refusal reading that it is no flag this takes. An agent stripping a property across eleven files hit this and had to read the source to learn that a passage arrives as a file rather than as a string. The cost is sharpest on edit, whose whole contract is that a stated passage matches exactly once, since a caller who guesses the surface wrong learns it by refusal and a caller who guesses it right by accident learns nothing at all. Everything a help answer would say is already stated on each command page as a definition and a set of design lines, so this asks for a way to reach what is written rather than for anything new to be written. Recorded rather than fixed because what a command should say when asked, and whether the answer is built from the page or written twice, is a decision about the command page type and not about any one command.",
} as const satisfies Finding
