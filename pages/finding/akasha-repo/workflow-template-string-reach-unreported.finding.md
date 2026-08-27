---
id: 6254999d-b946-5a85-8130-6f9a88d662da
slug: workflow-template-string-reach-unreported
page-type-slug: finding
title: "A file named as a raw string in a workflow template reads as dead code"
domain-slug: repo/akasha-repo
---

# Claim

The workflow templates under `pages/workflow-template/` name files as raw strings
inside shell commands, which resolve only when the CI pod runs the step.

The consequence is that a file can be load-bearing for the pipeline while every
instrument in this repository reports it as unreferenced.

# Evidence

`pages/workflow-template/workflow-preparation.workflow-template.declaration.attachment.ts`
runs

    bun "$AKASHA_ROOT/tools/lib/pipeline-run/write-changed-files.ts"

as text inside a shell command. Nothing in the repository imports
`tools/lib/pipeline-run/write-changed-files.ts`, so an import search reports it as
dead. It is not.

This is not one file. A template names an executable this way wherever a step runs
one, and a path spelled inside a shell string is invisible to the compiler, to an
import graph, and to any unused-code sweep built on either. Interpolating the tree
root into the string hides it from a plain path search as well.

Nothing reports which files are reached only this way, so nothing would notice one
going until the pipeline ran.
