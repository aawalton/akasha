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
      statement:
        "All changes outside of `akasha change` are mechanical changes made through `runMechanicalChange`.",
      workingMemory:
        "`notification-feed-rows` names the feed's files uncommitted, so the append through `page-entry-queue:47` lands on a path git ignores. `queueAt`'s other caller, `transport-log`, is reached by no log path. `landedMechanically` has no caller but its own test. `restore.command:206` writes HEAD's own body back, landing no change. `repository-is-written-by-a-change` holds the rest, refusing a rooted write of anything `.gitignore` does not hold out of the commit.\n",
    },
    {
      statement: "Every change is a patch before it is applied.",
      workingMemory:
        "Every landing road works a patch out first and reaches `applied`: `apply-running` for `change-apply`, and `runMechanicalChange` for every other program, which `subagent-presence` takes on every road of its own. No road left writes a file git tracks with neither patch nor landing; the notification feed's rows are named uncommitted now. `restore.command:206` writes HEAD's own body back, landing no change.\n",
    },
    {
      statement: "A seat's logs and socket are uncommitted properties beside that seat's page.",
      workingMemory:
        "`.supervisors/<seat id>/` holds `oauth-proxy.log`, `oauth-proxy.sock`, `oauth-proxy.stderr.log`, `subagent-presence.log` and `supervisor.log`. `supervisor-log-path:4` names the folder, and `supervisor-console`, `supervisor-log-sweeping`, `subagent-census` and `subagent-presence` reach it. The seat page type already holds uncommitted properties, and `page-entry-landing` already names and writes their files.\n",
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
