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
        "Fifty-five view pages sit under `pages/views/pages/`, and the serving pod answers `/api/pages/view` with 200 and a body of 38030 bytes. A view is reached at `/:pageTypeSlug`, so a view draws once the page type behind it is held.",
    },
    {
      statement: "Alan can load the view for task pages.",
      workingMemory:
        "Three views name tasks: `tasks-today`, `tasks-up-next` and `tasks-not-completed`. The serving pod answers `/api/pages/task` with 503, saying `task` names no page type the index holds, so this rung waits on the index rather than on the views.",
    },
    {
      statement: "Alan can load the view for temper task pages.",
      workingMemory:
        "Five views name temper tasks: `temper-tasks-all`, `temper-tasks-completed`, `temper-tasks-today`, `temper-tasks-up-next` and `alanwalton-temper-tasks`. The serving pod answers `/api/pages/temper-task` with 200 and a body of 48168 bytes, so the data behind this rung is held.",
    },
  ],
} as const satisfies Initiative
