import type { Initiative } from "../initiative.page-type.types.ts"

export const dallaDraftIntoAPatch = {
  id: "01a05f32-3256-7b26-94ec-82af5035c9bb",
  pageTypeSlug: "initiative",
  type: "initiative",
  slug: "dalla-draft-into-a-patch",
  domain: "page-type/change",
  persona: "dalla",
  intents: [
    {
      statement: "A seat's logs and socket are uncommitted properties beside that seat's page.",
      workingMemory:
        "`.supervisors/<seat id>/` holds `oauth-proxy.log`, `oauth-proxy.sock`, `oauth-proxy.stderr.log`, `subagent-presence.log` and `supervisor.log`. `supervisor-log-path:4` names the folder, and `supervisor-console`, `supervisor-log-sweeping`, `subagent-census` and `subagent-presence` reach it. The seat page type already holds uncommitted properties, and `page-entry-landing` already names and writes their files.\n",
    },
    {
      statement: "Each piece the asking module holds sits in a module answering for one concern.",
      workingMemory:
        "`asking.module.code.ts` holds six concerns: `mistaking` and `troubling` word a refusal, and nearly every command reaches them; `bytesAt`, `textOf` and `textAt` read a body off disk; `BREAK_GLASS` names a flag `command-flags` carries the rest of; `glassSaid`, `bypassedIn`, `unloadableIn` and `counted` word commit trailers; `puttingUpSaid` spells the command putting a subagent's page up; `MECHANICAL` is a change kind. The module page states this as a gap already.\n",
    },
  ],
  constraints: [
    "A read hands back the body at HEAD rather than the body the patch would leave.",
    "A warrant refuses a draft as it refuses a landing.",
    "A patch holding conflicts does not apply.",
    "An agent id carries at most one patch.",
    "The edits an agent keeps are an uncommitted file appended to in place.",
    "A draft is an authored change.",
    "A patch runs the checks and the warrants that any change drafted into it runs.",
    "Alan settles each block's shape before it lands.",
    "A mechanical change is landed by a change page rather than by the command that page replaces.",
    "A change page takes no dry run.",
    "The edits a draft keeps are the dry run.",
  ],
} as const satisfies Initiative
