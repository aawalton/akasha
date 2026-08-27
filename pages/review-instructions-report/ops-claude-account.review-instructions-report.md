---
id: f811e635-1eed-540b-a004-8ca40cf385f9
slug: ops-claude-account
page-type-slug: review-instructions-report
title: "Ops claude account"
---

# Lines

1. **Intent — "A mark the running fleet set is cleared by the command named for it, never by writing the field."**
   - Keep, with the fork handed back. One mark has a command named for it and one only: `ops claude-account re-enable --account aine` answered `ok` and left the page untouched, `git status --porcelain` standing at the same two unrelated files before and after, and `re-enable.ts` calls `clearAccountSubscriptionDisabled`, which writes `subscription-disabled-reason: null` and nothing else.
   - Every other mark the fleet sets is cleared by the fleet. `tools/lib/oauth-page-state.ts` names `retry-after`, `terminal-at`, `terminal-alerted-at` and `last-window-trigger-at`; `oauth-account-health.ts` writes `terminal-at` back to null on the refresh that succeeds, and `selectStaleAtLimitMarks` heals a `retry-after` further out than the backoff ceiling. No page here carries a disabled mark today, over all 8 accounts.
   - So the entry reads two ways. Read as "no mark is cleared by hand-writing a field", it is already true and `domains/domain-intent.md` says to move or delete it. Read as "each mark has a command of its own", it is unmet, one of five having one. The two ask for opposite acts, so the line goes back to the principal rather than being settled here.

2. **`# Intent` and the section beneath it**
   - Keep. `page-body-shapes/domain.md` gives `intent` a count of 0-1 and a `{intent}` slot rather than a bare heading, so the section stands exactly while something stands beneath it — and the one entry beneath it is kept at line 1. `ops instructions run-gates domains/ops-claude-account.md` passes `page-holds-shape` at 16 parts against the shape `domain` states, with the section as it is.

3. **Design — "Every command naming one account takes it as `--account`; the ones covering the whole set take no account at all."**
   - Cut. True as run, and it earns nothing. All seven helps state it: `add`, `re-enable`, `refresh` and the three under `reauth` each list `--account <name> (required)`, and `sync-aliases`, the one command over the whole set, lists no flag at all and answered `8 account(s) written to /var/home/walton/.claude/account-aliases.json` with the eight names under it.
   - A wrong guess costs one exit-1 and prints the answer. `ops claude-account sync-aliases --account aawalton` refused with `unknown flag: --account (did you mean ops claude-account add --account, ops claude-account re-enable --account, ops claude-account reauth cancel --account, or 3 more?)`, so the dispatcher names the convention and the six commands holding it at the moment anyone gets it wrong.
   - The second clause is a tautology besides — a command covering the whole set has no one account to name — and half of what the first clause covers is `domains/ops-claude-account-reauth.md`'s, a namespace of its own with its own glob. `domains/agent-harness.md` keeps an instruction only where Opus 5 would consistently go wrong without it, and the help every caller already opens states the flag.

4. **Design — "No command here prints a token value; what they read is the bookkeeping recorded beside it."**
   - Repair, and the entry moves to Intent. The first clause is false. `ops claude-account refresh --account aawalton --json` printed `{"ok":true,"credential":{...}}` with a live `accessToken` and `refreshToken` in it, 108 characters each and both opening `sk-`; I ran it through a filter that reported only each value's type and length, so the tokens went to no transcript. The account's token expires 2026-08-20T02:25Z, so the call short-circuited and wrote nothing.
   - No other command prints one, over every `process.stdout.write` in the four files here and the three under `reauth`: `add` prints the page path and the c-alias, `sync-aliases` the snapshot path and eight names, `re-enable` `ok` and the account, `reauth cancel` `cancelled:`, `reauth start` the authorize URL, `reauth submit` eligibility and its exclusion reasons.
   - The second clause is false too: all seven commands state `kind: intervention` on their own documents, so none of them is an instrument that reads. The claim was right as an aim and wrong as a fact, which is what `domains/domain-intent.md` takes, so it lands there as "No command here prints a token value, not even `refresh --json`." The `# Design` heading goes in the same commit, its last entry having left.

5. **`# Design` and the section beneath it**
   - Cut, and it went in `6c2c0c0` with its last entry, as the mend that move made necessary. `page-body-shapes/domain.md` gives `design` a `{design}` slot rather than a bare heading, so the section cannot stand empty; one of its two entries was cut at line 3 and the other moved to Intent at line 4.
   - `ops instructions run-gates domains/ops-claude-account.md` passes `page-holds-shape` at 16 parts against the shape `domain` states with the section gone, and `page-types/domain.md` says a slug and a definition is a whole domain rather than a stub waiting to be filled in.

6. **Definition bullet — "Ops claude account — the commands that onboard a claude-account and read or set the bookkeeping around its credential."**
   - Repair. "read" is false: every one of the seven states `kind: intervention` on its own document under `domains/commands/`, so nothing here is an instrument, and no command answers what an account's bookkeeping says.
   - "the bookkeeping around its credential" leaves four of the seven outside it. `refresh` and the three under `reauth` write the credential itself rather than anything beside it, and `sync-aliases` rewrites a file outside the repo — it answered `8 account(s) written to /var/home/walton/.claude/account-aliases.json`, which is no part of a credential.
   - Repaired to "the commands that onboard a claude-account and maintain its page, credential and aliases", which reaches all seven: `add` onboards with the next c-alias slot, `re-enable` clears a mark on the page, `refresh` and `reauth` hold the credential, `sync-aliases` and `add` write the aliases. 89 characters against the 100 the `body` slot allows at `sm` on the ladder in `tools/document/tokens.ts`.

7. **`# Definition` and the section beneath it**
   - Keep. `page-body-shapes/domain.md` gives `definition` a repeat of 1, so the heading is the one part of this body that is not optional, and with Design gone it stands over the whole document. Beneath it is exactly one bullet, which is all `domains/domain-definition.md` allows.

8. **Frontmatter**
   - Keep, with `reviewed-date` stamped at the end. `instructions-path: tools/commands/claude-account/*.ts` reaches this namespace's own four commands and no more — `add.ts`, `re-enable.ts`, `refresh.ts`, `sync-aliases.ts` — the `reauth/` subtree being `domains/ops-claude-account-reauth.md`'s, declared under its own glob. That is the set this domain is about, which is what `page-types/domain.md` asks of a glob.
   - Nothing under `reauth/` is left ungoverned by the split: `ops instructions governs --file-path tools/commands/claude-account/reauth/start.ts` names this document along with the child namespace's, the parent reaching it through `domain-parents-slugs` rather than through a glob.
   - `ops instructions run-gates domains/ops-claude-account.md` passes `page-holds-properties` at 7 keys against the 33 `domain` and what it extends declare, `relations-resolve` at 5 of 5, `domain-slug-stem`, `domain-slug-unique` over 2471 domains, and `repo-agrees`. The three parents are the shape the sibling `ops-claude-account-reauth` states too, with `domain-owner-slug` naming the first.
