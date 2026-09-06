import type { Initiative } from "../initiative.page-type.ts"

export const amyAlanHarnessImprovements = {
  id: "01a07679-5492-7992-ab84-cc889f134678",
  pageTypeSlug: "initiative",
  slug: "amy-alan-harness-improvements",
  domainSlug: "domain/alan-harness",
  personaSlug: "amy",
  intents: [
    {
      statement:
        "`akasha measure attributes` answers each attribute's total level, floored to two decimals.",
      workingMemory:
        "The total and the two decimal places are landed. What is left is the level: an attribute starts at 0 and climbs by 10, 10, 20, 30, 50, 80, 130, 210, which is Fibonacci times ten, so a level is the highest rung the points have reached. The points may sit beside the level. Every total counts from 2026-09-06 and no earlier. Charisma carries no rate: an hour at ease is a whole point where a point of strength is a metric ton lifted, so charisma climbs far faster than the rest.",
    },
    {
      statement: "Alan can see how much each widget on his phone is used.",
      workingMemory:
        "The marker and the beacon are landed. Each of Alan's six widgets carrying `opens` names itself after a `#` in that link, and `decideOpenUrlRoute` reads the path and the query alone, so routing is untouched. `deep-link-open-sync` reads the name off the raw link and posts `/api/widget-tap`, which counts the tap on the widget's `taps` and `lastTappedAt` through the page store. No tap is counted until the iOS app is rebuilt, because `opens` is baked into the widget extension when the Swift is generated.",
    },
    {
      statement: "Temper, Atlas and Archive of Worlds each show their nav items.",
      workingMemory:
        'The three asked `nav` for `key: "app"` carrying an app\'s id, and the `nav` page type declares `appSlug` and no key holding an id, so each question was refused and the navigation went unread. The layouts belonged to no page, which blocked the mend: `router-app` now declares `app-layout` at `routes/_app-layout.tsx` and the four apps state theirs. The three narrow by `appSlug` and are deployed. Atlas shows its sidebar with no warning. Temper carries 2 nav pages, Archive of Worlds 4, Atlas none.',
    },
  ],
} as const satisfies Initiative
