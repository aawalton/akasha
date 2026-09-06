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
        "`/` answers 200 with the app shell, then the app routes to `/home`, which answers 500 and draws `Oops!`. The pod log names the throw: `readHomeNavItemParam` raises because `nav` is no page type the pages system service holds. Akasha carries `pages/navs/nav.page-type.ts` and 29 nav pages, so the pages are here and the service serving the site does not hold them.",
    },
    {
      statement: "Alan can log in to alanwalton.com.",
      workingMemory:
        "Anonymous `/home` answers 302 to `/sign-in?next=%2Fhome`, so the guard sends a signed-out reader to sign in. A signed-in browser reaches `/home` and is answered 500 there, so the login is not what stops the page.",
    },
    {
      statement: "Alan can load a view.",
      workingMemory:
        "Fifty-five view pages sit under `pages/views/pages/`. A view is drawn inside the app shell, and the shell's own nav read is unheld, so no view is reached until the nav page type is held.",
    },
    {
      statement: "Alan can load the view for task pages.",
      workingMemory:
        "Three views name tasks: `tasks-today`, `tasks-up-next` and `tasks-not-completed`.",
    },
    {
      statement: "Alan can load the view for temper task pages.",
      workingMemory:
        "Five views name temper tasks: `temper-tasks-all`, `temper-tasks-completed`, `temper-tasks-today`, `temper-tasks-up-next` and `alanwalton-temper-tasks`.",
    },
  ],
} as const satisfies Initiative
