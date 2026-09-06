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
        "A tap reaches no server: every widget's `opens` is a `capacitor://` link into the app bundle, and the upkeep and surplus widgets share one identical link, so counting taps needs a marker per widget in that link and a beacon from the app. A fetch does reach a server, because each widget names a feed route of its own. The count belongs on the widget rather than on a readout, since one widget draws a whole group and no single readout owns a tap.",
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
        "A view is reached at the page type's plural slug, so `/to-dos` rather than `/to-do`. The shell, the sidebar and the nav all draw there. The main area spins forever: the browser asks `/api/page-types` over and over and is answered 501 each time. That route is stubbed, and its body says the roster it drew named a repository and a glob per page type, which the pages service does not carry.",
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
