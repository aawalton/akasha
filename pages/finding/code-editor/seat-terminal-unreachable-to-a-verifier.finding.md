---
id: 01b0fc39-9728-542d-ae28-7d9e8451cc8b
page-type-slug: finding
title: "Seat terminal unreachable to a verifier"
domain-slug: domain/code-editor
---

# Claim

A seat verifying work on the Agents panel cannot construct a seat-owned terminal in its own throwaway editor instance, so any behaviour keyed on "this seat's terminal is in this window" can be observed only by the seat that wrote it.

# Evidence

Project #18375 placed a headless seat's transcript in the editor column holding its interactive ancestor's terminal, and in the column a stopped session last ran in. Both rules need a terminal the extension attributes to a named seat, present in the verifying window.

Verifying that hand-back, two routes were tried against a fresh instance built from deployed main, served on its own port with its own user-data and extensions directories.

Running `cr <seat-name>` in an editor-area terminal did not register: the seat's row stayed `running` and `spawned` across fifteen polls, and the terminal tab kept its shell name rather than taking the seat's.

Adding a `~/.cache/agent-terminal-name/<pid>.json` entry for that instance's own shell, with the pid confirmed to descend from the instance's server process, also did not take: `Ops Terminal Rename: Sync Now` left the tab reading `bash`. The entry was additive and was removed afterwards.

What this leaves is asymmetric. The delivering seat could observe those rules because its own instance already held seat terminals from the work it was doing. A verifier arriving afterwards holds an empty window, and the two criteria fall back to unit tests over the placement function plus the delivering seat's own account of its live run.

NOT MEASURED: why either route failed. The rename may key on a pid other than the shell's, may cover only terminals the extension itself created, or may skip the editor area entirely — no reading of the rename feature's source was made, and the observation here is only that neither route produced an attributed terminal.

NOT MEASURED: whether a verifier could reach the same state some third way, such as priming the extension's `globalState` store directly, which was not attempted.
