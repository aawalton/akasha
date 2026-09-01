import type { Initiative } from "../initiative.page-type.ts"

export const athenaSeatCommands = {
  id: "01a059f7-5322-7cc1-afec-ed6060446c8c",
  pageTypeSlug: "initiative",
  slug: "athena-seat-commands",
  domainSlug: "workspace-package/command-system",
  personaSlug: "athena",
  parentSlug: "akasha-migration",
  intents: [
    { statement: "A seat's name, id, page and launch are composed inside akasha." },
    { statement: "A seat is started through akasha." },
    { statement: "A seat is emptied and refilled through akasha." },
    { statement: "A seat is brought back on the session it is bound to through akasha." },
    { statement: "Every client behind the settings standing now is restarted through akasha." },
    { statement: "The settings every live seat watches are rewritten through akasha." },
    { statement: "The supervisor runs inside akasha." },
  ],
  constraints: [
    "Alan settles each act's shape before it lands.",
    "The acts stand on the seat command rather than as commands of their own.",
    "An act's old command goes as the act lands.",
  ],
} as const satisfies Initiative
