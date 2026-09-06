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
        "An anonymous request to https://alanwalton.com/ answers 200 with a body of 10613 bytes, so the site serves a reader who has not signed in.",
    },
    {
      statement: "Alan can log in to alanwalton.com.",
      workingMemory:
        "The anonymous request that proved the site loads exercises no login, so nothing here is checked yet.",
    },
    {
      statement: "Alan can load a view.",
      workingMemory:
        "Fifty-five view pages sit under `pages/views/pages/`. Whether a view draws once loaded is unchecked.",
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
