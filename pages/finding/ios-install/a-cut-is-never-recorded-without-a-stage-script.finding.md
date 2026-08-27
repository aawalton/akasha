---
id: 0518ae10-9811-5424-8444-628934bc101c
page-type-slug: finding
title: "A cut is never recorded without a stage script"
domain-slug: domain/ios-install
---

# Claim

An app whose `wwwStageScript` is null can never record a TestFlight cut, so `ops mobile cut-status` reports a cut owed however many builds that app has shipped.

# Evidence

`deploy-testflight.ts` assigns `mainSha` only inside `if (sync && app.wwwStageScript !== null)`, and the fingerprint write is gated on that assignment. Two of the three registered apps carry a null `wwwStageScript`, and both report the same way: `ops mobile cut-status --app atlas` and `--app smilingjenny` each answer "No TestFlight cut on record — an intentional cut is OWED (devices carry no build from this fingerprint era)". Atlas has answered that since reaching TestFlight in June 2026, and Smiling Jenny answers it while `ops mobile testflight-status --app smilingjenny` reports build 1 VALID and ready to install. `alanwalton`, which carries a stage script, records normally and names its last cut as build 167 at `69a0b51002d6`.

So the instrument that exists to say whether devices are current says the same thing forever for these apps, whatever is shipped, and a real cut leaves no trace on it.

What I did not measure: whether any consumer other than a person reading the line depends on the fingerprint, and whether a stage script is the right thing for a shell that stages nothing rather than the condition being the wrong test. The three-app population is the whole registry, so there is no fourth app to check the pattern against. I read the gating condition as the reporting seat quoted it and confirmed the behaviour it predicts; I did not step through the write path myself.
