import type { Finding } from "../domain-system/finding/finding.page-type.ts"

export const typecheckReadsDiskNotTheChange = {
  id: "01a04bc4-7e87-764d-a726-04f7405a3e56",
  pageTypeSlug: "finding",
  slug: "typecheck-reads-disk-not-the-change",
  domainSlug: "domain/checks-system",
  claim: "The typecheck check judges what is on disk rather than what the change would leave, and today nothing reveals the difference.",
  evidence:
    "Every other check answers from the bytes it is handed, so it judges the change. A compiler takes file names, not bodies, so this one reads the folder off disk. The two agree only because the runner's reader is `onDisk`, which reads the same disk. The moment a door judges a patch before it lands — which is the stated point of the phase, that a refused change leaves nothing behind — this check will compile the tree without the change in it and answer about a state nobody proposed. It will not fail loudly; it will pass. The shape underneath is that `needs` admits `path` or `file` and never a set, so a check cannot be handed the change; the same limitation makes a collateral diagnostic get reported once per changed file rather than once.",
} as const satisfies Finding
