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
        "The command answers the reading for the day rather than a total, and every attribute page carries a lifetime of zero, so nothing sums a day into a lifetime yet. The flooring and the two decimal places are done. Each readout's own code holds what one point of that attribute costs, so a total is those daily points added up rather than the arithmetic written again.",
    },
    {
      statement: "Alan can see how much each widget on his phone is used.",
      workingMemory:
        "The marker and the beacon are landed. Each of Alan's six widgets carrying `opens` names itself after a `#` in that link, and `decideOpenUrlRoute` reads the path and the query alone, so routing is untouched. `deep-link-open-sync` reads the name off the raw link and posts `/api/widget-tap`, which counts the tap on the widget's `taps` and `lastTappedAt` through the page store. No tap is counted until the iOS app is rebuilt, because `opens` is baked into the widget extension when the Swift is generated.",
    },
    {
      statement: "alanwalton.com loads.",
      workingMemory:
        "`/` answers 200 with the app shell, then the app routes to `/home`, which answers 500 and draws `Oops!`. `readHomeNavItemParam` in `alan/web/.server/home-dni-param/home-dni-param.module.code.ts` throws on every call and asks nothing. The sentence it throws says `nav` is unheld, and that sentence is stale: the serving pod answers `/api/pages/nav` with 200 and 29 rows, one of them the `home` item the throw names.",
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
