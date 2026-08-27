---
page-type-slug: page-body-shape
title: "Notice"
id: 01a0006f-606d-7003-a75e-580c9c07cafe
slug: notice
extends-slug: none
blocks:
  title:
    repeat: 1-8
  notice:
    count: 1-12
    repeat: 0-3
slots:
  title:
    max: lg
  preamble:
    max: xl
  notice:
    pattern: "^[a-z][a-z0-9-]*$"
    backstop: 60
  body:
    max: lg
---

# {title}

{preamble}

## {notice}

{body}
