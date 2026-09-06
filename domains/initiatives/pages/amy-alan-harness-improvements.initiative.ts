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
      statement: "alanwalton.com loads.",
      workingMemory:
        "`/home` no longer answers 500. `readHomeNavItemParam` asks the pages for the `home` nav item and answers its id, landed as `76a619246f` and serving from `efe2941cc8`. The shell, the sidebar and the nav all draw, and the title moves to the view that item names, so the id resolved. What is left is the content, which waits on the roster refusal named under the view intent.",
    },
    {
      statement: "Alan can log in to alanwalton.com.",
      workingMemory:
        "Anonymous `/home` answers 302 to `/sign-in?next=%2Fhome`, so the guard sends a signed-out reader to sign in. A signed-in browser reaches `/home` and is answered 500 there, so the login is not what stops the page.",
    },
    {
      statement: "Alan can load a view.",
      workingMemory:
        "`/api/page-types` answering 501 is the gate. A roster answer that is not ok becomes unreachable, so `backingOf` answers null, neither attach branch runs, no collection is ever fetched, and the ask repeats every two seconds forever. Two faults sit under it: the interface narrows views by `nav` and by `owner` where each row carries `navSlug`, and no view names a `pageType`, so all 55 resolve no subject. The rows themselves are held.",
    },
    {
      statement: "Alan can load the view for task pages.",
      workingMemory:
        "A task is a `to-do` page, drawn at `/to-dos`, under the `tasks` nav item. Three views name it: `tasks-today`, `tasks-up-next` and `tasks-not-completed`. The serving pod answers `/api/pages/to-do` with 200 and 36 rows, so the pages are held and this rung waits on the same 501 from `/api/page-types` that stops every view.",
    },
    {
      statement: "Alan can load the view for temper task pages.",
      workingMemory:
        "Drawn at `/temper-tasks`, which spins exactly as `/to-dos` does. Five views name temper tasks: `temper-tasks-all`, `temper-tasks-completed`, `temper-tasks-today`, `temper-tasks-up-next` and `alanwalton-temper-tasks`. The serving pod answers `/api/pages/temper-task` with 200 and a body of 48168 bytes, so the pages are held.",
    },
  ],
} as const satisfies Initiative
