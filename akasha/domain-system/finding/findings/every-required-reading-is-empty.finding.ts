import type { Finding } from "../finding.page-type.ts"

export const everyRequiredReadingIsEmpty = {
  id: "01a04d4d-b0e5-7337-bc4c-0b7e8ce18655",
  pageTypeSlug: "finding",
  slug: "every-required-reading-is-empty",
  domainSlug: "domain/domain-system",
  claim:
    "Every required reading value in the corpus is empty and no page carries a conditional reading value at all, so the whole mechanism domain-system owns for getting a page to an agent before it acts has no instance.",
  evidence:
    "Twenty-eight pages state requiredReadingSlugs and all twenty-eight state it empty, emptied deliberately in `pages: 11 files — empty every requiredReadingSlugs value for a clean slate`. No page in the corpus states conditionalReadingSlugs. Those two properties are the whole of what domain-system has for delivering a page to a reader at the moment of a choice. The effect on domain-system's own lines is worth naming. Its design says `Context a choice does not need does not reach the agent making it` and its intent says `Agents have the context each choice needs at the time they make it`. With the mechanism at zero the design is satisfied by delivering nothing, which is not the state it names, and the intent moved further away rather than nearer. The two design entries on required-reading-slugs, that a domain may name one below it in the tree and that it names only the terms a reader would misread it without, now describe a property with no values, so they constrain nothing and cannot be got wrong. A clean slate is a reasonable act and this is not an argument against it. What is missing is that nothing records the corpus is in the emptied state, nothing says what refills it or on what basis, and a reader of domain-system sees a design and an intent that both read as live. Recorded rather than fixed because refilling required reading is a judgement about each domain in turn and would change lines across the corpus.",
} as const satisfies Finding
