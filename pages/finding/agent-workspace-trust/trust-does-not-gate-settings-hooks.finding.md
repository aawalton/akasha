---
id: 88cfdfcf-cca5-58d2-abe9-4c1213893193
page-type-slug: finding
title: "An untrusted working directory does not suppress the hooks a launcher delivers with --settings"
domain-slug: domain/agent-workspace-trust
---

# Claim

An untrusted working directory does not suppress the hooks a launcher delivers with `--settings`, so workspace trust does not explain a seat losing its hooks. This was measured headless only; the interactive path is untested.

# Evidence

Measured on 2026-08-18 with `tools/hook-bench.ts`, which composes a configuration directory the fleet does not share and installs exactly the hooks it is given.

The composed `config/.claude.json` held `projects: {}` and no `hasCompletedOnboarding`, so the session's working directory, `/var/tmp/athena-trust-probe/run-trusted`, carried no trust record of any kind. The declared `PreToolUse` hook on `Bash` fired once and exited 0, and the bench's own verdict was that every firing was one it installed. The run is kept at that path.

The claim this displaces was that an untrusted workspace makes Claude Code silently drop the hooks and permissions it was given, which was offered as the reason interactive sessions broke immediately after a restart confirmation prompt. That reasoning was never measured before it was used.

The scope is real and narrow. The bench runs headless, with `--permission-mode bypassPermissions`, and a trust dialog is a prompt nobody is present to answer, so the headless path may skip the question rather than answer it. What is settled is that hooks arriving by `--settings` are not conditional on a trust record. What is not settled is any interactive behaviour.

The consequence is that the workspace-trust repair landed on 2026-08-18 accounts for the confirmation prompt on restart and for nothing else. Whatever broke interactive sessions immediately afterwards has no established cause.
