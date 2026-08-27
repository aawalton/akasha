---
id: 956968c5-bbf0-5e2e-93bf-4ccc71253c5c
page-type-slug: list
title: "Code comment forms"
slug: code-comment-forms
domain-parent-slug: domain/code-comment
---

# Definition

- **Code comment forms** — the shapes of comment a program parses.

# Rules

## Form Approval

**Show Alan each code comment form you would add, and take his ruling before adding the next.**

A form binds every file the domain naming this list reaches, and nothing re-reads it later.

Never add a form to allow a comment you wrote.

His silence is not a ruling; ask again or wait.

# List

- **shebang** — `#!` on the first line; the kernel reads it to pick the interpreter.
- **expect-error** — `@ts-expect-error`; the compiler suppresses the error and fails where there is none.
- **biome suppression** — `biome-ignore`; biome skips the rule it names on the line below.
- **shellcheck directive** — `shellcheck` then `disable`, `enable`, `source`, `source-path`, `shell` or `external-sources`.
- **triple-slash reference** — `/// <reference …>`; the compiler loads the file it names before this one.
- **no-self annotation** — `@noSelfInFile`; TypeScriptToLua compiles the file's functions without an implicit `self`.
- **deprecation** — `@deprecated`; the language server marks every call site.
