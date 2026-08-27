---
id: 01a04480-1716-7000-a5c4-53f007fec89b
page-type-slug: domain
title: "Language failure"
slug: language-failure
domain-parent-slug: domain/language-design
---

# Definition

- **Language failure** — what a language does with a wrong program.

# Design

A program is found wrong at one of three moments: reading it, checking what it names, or running it on values.

A program that reads, checks and runs can still mean something other than its writer intended, and no failure catches that.

# Principles

## Caught Early

**Find a wrong program at the earliest moment it can be found.**

The later a fault is found, the more has been built on it and the less says why.

Check what a program says before what it does.

Never leave to run time what parsing could catch.

## Refuse Not Convert

**Refuse a value the program cannot use, rather than making one it can.**

A made value answers in place of the one meant, and nothing after it can tell which it got.

Let one absent value stop the whole answer.

Never add a conversion to make two types meet.

## Name The Cause

**Make a refusal say what was wrong and where, in the terms the program was written in.**

A refusal is the one part of a language its reader meets while already lost.

Name the value missing, not the step that broke.

Never report a fault in the evaluator's terms.
