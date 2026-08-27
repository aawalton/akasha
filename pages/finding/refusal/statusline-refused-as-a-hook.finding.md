---
id: 40e9c2fa-b5ff-5bc3-9774-477bbb5226db
slug: statusline-refused-as-a-hook
page-type-slug: finding
title: "Statusline refused as a hook"
domain-slug: page-type/refusal
---

# Claim

The refusal bodies that report a registration naming the code repository call whatever they name a hook, and the registry they are drawn from is not hooks alone. `commandsIn` collects every `command` string in the settings document, `statusLine` among them, so a statusline pointed at the code repository is refused by a body telling its reader the file belongs under `tools/hooks/` — where no statusline goes, the live one standing at `tools/statusline.sh`.

# Evidence

Found while reading `refusals/hook-registered-in-code.md` on 2026-08-11, which was left standing: the words are right for the case that fires, and widening them to cover a statusline makes them vaguer for every case that reaches a reader.

That body and its check are both gone. What carries the fault now is the other half, below: `tools/audits/hooks-uncopied.ts` and `pages/refusal/hook-copied-into-code.refusal.md`.

`tools/checks/hooks-registered.ts` collects the registry through `commandsIn`, whose own comment says "Every `command` string anywhere in the document, hooks and `statusLine` alike". Every registration naming the code repository becomes a finding printing `hook-registered-in-code`.

`commandsIn` stands at `tools/lib/hook-settings.ts:13-23` and still pushes every `command` string anywhere in the document.

Run rather than read: driving `hooksRegistered` over a fabricated settings document holding `"statusLine": { "type": "command", "command": "bash $HOME/code/scripts/statusline.sh" }` printed the body with its second paragraph intact — "No registration is excepted: every hook belongs under `tools/hooks/`, where this repository's own checks reach it."

`tools/checks/hooks-uncopied.ts` draws its population the same way, through `registeredHooks`, which calls `commandsIn` and reports its count as "hook(s) the fleet fires". Its body `hook-copied-into-code` carries the same noun in "No hook is excepted: every one belongs under `tools/hooks/`."

It is `tools/audits/hooks-uncopied.ts` now, `registeredHooks` at :29, and `pages/refusal/hook-copied-into-code.refusal.md` still closes on that sentence. Driving `registeredHooks` over the live `settings/agents.json` answers 27, and `statusline.sh` is one of the 27, mapped to `akasha/tools/statusline.sh`. `bun tools/run-checks.ts --check hooks-uncopied` prints `[over 27 hook(s) the fleet fires]`, so the statusline is counted as a hook by the population line as well.

Unfired at the time of the reading: the live `settings/agents.json` registers 27 path-bearing commands, every one spelled `$HOME/instructions/…`, and `hooks-registered` reports none naming the code repository.

Still unfired, for a different reason: the 27 are now spelled `$HOME/repos/akasha/…`, the statusline among them at `settings/agents.json:284-287`, and `tools/statusline.sh` is the only file of that name git tracks — so its own registration is not read as a copy of itself and nothing prints. The wrong noun is in the population count rather than in a refusal anyone has met.

Where the answer might sit, neither part being this reading's to take: the checks could name the population something true of a statusline as well as of a hook, or the bodies could say what a registration naming the code repository has to become without calling it a hook.
