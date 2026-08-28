---
id: 21b8bc1b-c665-5ab6-96fe-d98446367a4e
page-type-slug: page-property-definition
title: "Error kind"
defined-on-slug: page-type/error
key: kind
type: select(lower-kebab-case)
values:
  - error
  - react-render
  - unhandledrejection
  - webview-process-terminated
  - native-crash
required: true
slug: error-kind
domain-parent-slug: page-type/error
---

# Definition

- **Error kind** — how the breakage reached the recorder.
