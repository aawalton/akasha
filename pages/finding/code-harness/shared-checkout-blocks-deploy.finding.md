---
id: 492a2a10-dc4d-5281-ad9f-f3f9f9bbf52a
page-type-slug: finding
title: "Shared checkout blocks deploy"
domain-slug: domain/global
---

# Claim

Any uncommitted file in the shared `~/code` checkout blocks every seat's deploy, and the remedy the refusal names discards whatever put it there — including another seat's work in progress.

# Evidence

On 2026-08-10 at 23:33Z, `ops project deploy --seq 18497` refused with `deploy_main_dirty: uncommitted changes in main repo (/home/walton/code)`, naming two untracked files: `packages/agents/shared/zz-verify-18348-choke.ts` and `packages/alanwalton/web/app/routes/zz-verify-18348-color.ts`. Neither belonged to project 18497, and the deploy had passed branch CI moments before.

The refusal printed one remedy: `ops launcher realign --discard-local-changes`.

Those files were not debris. Process 3569436, alive at the time and started at 17:31, held this command: write both files, run `check-messages-write-chokepoint.ts` and `check-color-literals.ts` with `timeout 900` each, then `rm -f` both. It was a lead verifying project 18348, and the files were deliberately malformed plants written so those two checks would fire on them. Both were removed by their owner at 23:33:17Z, and a third, `zz-verify-18348-choke2.ts`, appeared afterwards as the run continued.

Running the named remedy during that window would have deleted the plants between the write and the check. Both checks would then have scanned a tree with nothing planted in it, found no violation, and reported a pass — which is the same output they give when a check correctly finds nothing. The verifying seat had no way to tell those apart, so the corruption would have landed silently in another lead's verdict.

Two properties meet here. A seat verifying that a check fires must plant a file where the check looks, and `check-repo-paths`-style checks look at `~/code`; the Read-Only Main rule on `domains/folders/code-repo.md` forbids writing there, so the plant is already out of bounds. Separately, the deploy gate treats any dirt in that checkout as a reason to stop, without regard to whose it is.

The deploy was not attempted again until the owning process exited and the tree was clear.
