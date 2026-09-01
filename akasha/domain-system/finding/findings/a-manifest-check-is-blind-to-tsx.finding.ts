import type { Finding } from "../finding.page-type.ts"

export const aManifestCheckIsBlindToTsx = {
  id: "01a05b6b-b585-708b-94cd-6ddeec9fba7a",
  pageTypeSlug: "finding",
  slug: "a-manifest-check-is-blind-to-tsx",
  domainSlug: "domain/akasha-check",
  claim:
    "manifest-names-what-is-reached reads only files ending `.ts`, so a package whose code is all TSX reads as reaching nothing and every dependency it names is refused as unreached. No TSX package can state its own dependencies. The call taken in Alan's absence: design-badges landed with a manifest naming no dependencies at all, which passes because both halves of the rule go quiet when no reach is seen.",
  evidence:
    "manifest-names-what-is-reached.code-check.code.ts:26 sets TS_ENDING = '.ts'. Line 261 in holdingBy skips any path not ending in it, so a package's holdings never include .tsx, and wholeOf answers an empty reach. Line 306 skips .tsx the same way, which is why the reached-but-unnamed half never fires either. Its own change-walking module states the opposite at change-walking.module.ts:21, 'A body read as code is named .ts or .tsx'. Observed against akasha/design/design-badges, 14 .tsx files: a manifest naming class-variance-authority, lucide-react, zod, @shared/design-primitives and @shared/design-forms was refused on all five, every one of them plainly imported in badge.module.code.tsx. react and the radix packages escaped only because peerDependencies is exempt and OWN is ['dependencies','devDependencies']. An index refresh at e030df2bed changed nothing, ruling out index staleness. Widening TS_ENDING to cover .tsx is a one-line fix, but it changes what the check refuses, which the Alan Approves Checks directive reserves to Alan, and it would at once refuse readout-system, whose readout-ring.module.code.tsx reaches react while its manifest names only zod. That is the Zero At Turning On problem, so the fix wants Alan and a sweep of every TSX package rather than one lane taking it.",
} as const satisfies Finding
