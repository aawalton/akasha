---
id: 8ab59a0d-905c-5c7c-a3a6-22cbeecbdd57
slug: messages-claimed-before
page-type-slug: page-query
title: "Messages claimed before"
page-type: message
takes:
  to: text
  before: instant
where:
  to:
    is: $to
  claimed-at:
    before: $before
keys:
  - to
  - from
  - warrant
  - claimed-at
  - body
---
