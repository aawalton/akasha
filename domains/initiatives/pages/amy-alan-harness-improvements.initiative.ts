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
      statement: "Alan can load a view.",
      workingMemory:
        "Four faults each stopped every view, and each is landed. `/api/page-types` answers a roster of 462 page type slugs where it answered 501 by design. The interface narrows `nav` by `appSlug` and `view` by `navSlug`, where it named keys neither type declares, and a key a page type declares nothing for is refused rather than left out. The `view` page type declares `pageType`, and 46 views name the type each lists, recovered from the `drawsSlug` that `1145f75519` deleted from 45 files. `page-detail-loading` asks for `externalId` and `gameEngine` only of a type declaring them. In the serving pod 46 of 55 views resolve a subject and 36 hold rows.",
    },
    {
      statement: "Alan can load the view for task pages.",
      workingMemory:
        "A task is a `to-do` page under the `tasks` nav item, and `tasks-today`, `tasks-up-next` and `tasks-not-completed` each name `to-do` and resolve that subject in the serving pod against 36 rows.",
    },
    {
      statement: "Alan can load the view for temper task pages.",
      workingMemory:
        "`temper-tasks-all`, `temper-tasks-completed`, `temper-tasks-today`, `temper-tasks-up-next` and `alanwalton-temper-tasks` each name `temper-task` and resolve that subject in the serving pod against 24 rows. The completed view narrowed nothing under a title saying otherwise and now narrows to the tasks carrying a completion.",
    },
    {
      statement: "Temper, Atlas and Archive of Worlds each show their nav items.",
      workingMemory:
        "Each of the three asks `nav` for `key: \"app\"` carrying an app's id, where the `nav` page type declares `appSlug` and no key holding an id, so each question is refused and the whole navigation goes unread. The three-line mend is written and each app already exports the slug it needs. What blocks it is that `temper/temper-web/routes/_app-layout.tsx`, `alan/atlas-web/routes/_app-layout.tsx` and `archive-of-worlds/archive-of-worlds-web/routes/_app-layout.tsx` belong to no page, so every write to them is refused. Each is named by path from its app's `routes.ts`, which does belong to a page, so a route page could take it — but a layout is imported by the route table rather than reached by a url, which is not what a route is.",
    },
    {
      statement: "Every view lists the pages it is named for.",
      workingMemory:
        "Nine views name no page type and no predicate, so each resolves no subject and lists nothing: `archive-of-worlds-new-page-list`, `docs-all-pages`, `docs-claude-md`, `notifications-closed`, `notifications-unread`, `temper-new-page-list`, `tracking-session-tracking`, and the `errors` nav holds no view at all. No page type of the 460 declares `sent-at`, `source-path` or `start-time`, which those views narrow and sort by, so each names a subject that never landed rather than one spelled wrong. `home-favorites` and `home-recently-viewed` name predicates instead and are right as they are. The registry filed the favorites predicate under `FAVORITES` where the view spells it `favorites`, so it answered nothing; `a096ceda0b` keys it as the view spells it and origin does not carry that commit, so the home tab shows favorites only once a push lets a deploy go up.",
    },
  ],
} as const satisfies Initiative
