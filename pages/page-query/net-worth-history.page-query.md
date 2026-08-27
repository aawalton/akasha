---
id: 49e8f4ca-864b-51eb-8061-7462c80b76f1
page-type-slug: page-query
title: "Net worth history"
page-type: temper-net-worth-snapshot
takes:
  userId: text
  since: number
where:
  userId:
    is: $userId
  dataTimestamp:
    at-or-after: $since
sort-by: dataTimestamp
keys:
  - id
  - userId
  - dataTimestamp
  - totalValue
  - excludedGuildBankValue
---
