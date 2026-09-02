import type { Finding } from "../finding.page-type.ts"

export const theUnnamedHalfReadsNoStylesheet = {
  id: "01a06318-4aaf-7e11-a77f-4f6aa63a59fc",
  pageTypeSlug: "finding",
  slug: "the-unnamed-half-reads-no-stylesheet",
  domainSlug: "domain/akasha-check",
  claim:
    "manifest-names-what-is-reached reads its two halves by different extensions. `holdingBy` asks `bodyNamed` and credits a reach from a `.ts`, a `.tsx` or a `.css`. The guard before `unnamedIn` asks `textNamed` and refuses from a `.ts` or a `.tsx` alone. A package reaching from a stylesheet is credited for what it names and never refused for what it leaves out. Nothing is hidden by this today: no stylesheet under akasha reaches a package its own manifest does not name.",
  evidence:
    "manifest-names-what-is-reached.code-check.code.ts:341 reads `if (!textNamed(given.path)) return []`, widened from `.ts` alone at 1ec2975187. Line 296 in `holdingBy` reads `if (!bodyNamed(path)) continue`, and `bodyNamed` is `textNamed` or `styleNamed`; `styleReachIn` at line 129, reached through line 140, reads an `@import` or a `url()`. So a stylesheet is read for what it credits and never for what it owes. Swapping the guard to `bodyNamed` would close that and would refuse nothing today: every bare specifier the 7 stylesheets under akasha spell is already named by the manifest owning it. design-look.stylesheet.styles.css reaches `@fontsource-variable/geist-mono` by an `@import` and `@fontsource-variable/geist` by five `url()` calls, and @akasha/design-system names both, so design-system is refused nothing. That refutes the earlier reading that a package taking its fonts through a stylesheet cannot name them: the `.css` half of `holdingBy` landed at 96b233f937 and credits them. Widening the guard to `.tsx` took audit from 11 refusals to 16. The five new ones are all reached-but-unnamed in a `.tsx` and none in a `.css`: block-accessory-bar and playing-session-context reach react-dom, markdown-renderer reaches react-markdown and remark-gfm, and reader-prose-body reaches @tanstack/react-virtual.",
} as const satisfies Finding
