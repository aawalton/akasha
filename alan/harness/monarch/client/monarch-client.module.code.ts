import { array, bool, num, object, optional, str } from "../shape/monarch-shape.module.code.ts"

const API_URL = "https://api.monarch.com/graphql"
const REQUEST_TIMEOUT_MS = 30_000
const PAGE_SIZE = 500

export interface MonarchAccount {
  readonly id: string
  readonly displayName: string
  readonly currentBalance: number
  readonly isAsset: boolean
  readonly isHidden: boolean
  readonly syncDisabled: boolean
  readonly deactivatedAt: string | null
  readonly holdingsCount: number
  readonly typeName: string
  readonly subTypeName: string
  readonly raw: unknown
}

export interface MonarchNamed {
  readonly id: string
  readonly name: string
}

export interface MonarchCategory {
  readonly id: string
  readonly name: string
  readonly groupName: string | null
  readonly groupType: string | null
  readonly raw: unknown
}

export interface MonarchTag {
  readonly id: string
  readonly name: string
  readonly color: string | null
  readonly order: number | null
}

export interface MonarchTransaction {
  readonly id: string
  readonly date: string
  readonly amount: number
  readonly pending: boolean
  readonly isRecurring: boolean
  readonly hideFromReports: boolean
  readonly needsReview: boolean
  readonly isSplitTransaction: boolean
  readonly notes: string | null
  readonly account: MonarchNamed | null
  readonly category: MonarchNamed | null
  readonly merchant: MonarchNamed | null
  readonly tags: readonly MonarchTag[]
  readonly raw: unknown
}

export interface MonarchStamp {
  readonly id: string
  readonly updatedAt: string
}

export interface MonarchHolding {
  readonly id: string
  readonly quantity: number
  readonly basis: number | null
  readonly totalValue: number
  readonly securityName: string
  readonly ticker: string | null
  readonly raw: unknown
}

const ACCOUNTS_QUERY = `query GetAccounts {
  accounts {
    id displayName syncDisabled deactivatedAt isHidden isAsset mask
    createdAt updatedAt displayLastUpdatedAt currentBalance displayBalance
    includeInNetWorth hideFromList hideTransactionsFromReports
    includeBalanceInNetWorth includeInGoalBalance dataProvider
    dataProviderAccountId isManual transactionsCount holdingsCount
    manualInvestmentsTrackingMethod order logoUrl
    type { name display }
    subtype { name display }
    credential {
      id updateRequired disconnectedFromDataProviderAt dataProvider
      institution { id plaidInstitutionId name status }
    }
    institution { id name primaryColor url }
  }
}`

const CATEGORIES_QUERY = `query GetCategories {
  categories {
    id name order icon isSystemCategory isDisabled
    group { id name type }
  }
}`

const TRANSACTIONS_QUERY = `query GetTransactionsList($offset: Int, $limit: Int, $filters: TransactionFilterInput, $orderBy: TransactionOrdering) {
  allTransactions(filters: $filters) {
    totalCount
    results(offset: $offset, limit: $limit, orderBy: $orderBy) {
      id amount pending date hideFromReports plaidName notes isRecurring
      reviewStatus needsReview isSplitTransaction createdAt updatedAt
      category { id name }
      merchant { name id transactionsCount }
      account { id name: displayName }
      tags { id name color order }
    }
  }
}`

const STAMPS_QUERY = `query GetTransactionsList($limit: Int, $filters: TransactionFilterInput) {
  allTransactions(filters: $filters) {
    totalCount
    results(limit: $limit) { id updatedAt }
  }
}`

const STAMP_LIMIT = 20_000

const HOLDINGS_QUERY = `query Web_GetHoldings($input: PortfolioInput) {
  portfolio(input: $input) {
    aggregateHoldings {
      edges {
        node {
          id quantity basis totalValue securityPriceChangeDollars
          securityPriceChangePercent lastSyncedAt
          holdings { id type typeDisplay name ticker closingPrice isManual closingPriceUpdatedAt }
          security { id name type ticker typeDisplay currentPrice currentPriceUpdatedAt closingPrice closingPriceUpdatedAt oneDayChangePercent oneDayChangeDollars }
        }
      }
    }
  }
}`

function readNamed(value: unknown, path: string): MonarchNamed | null {
  return optional(value, path, (v, p) => {
    const o = object(v, p)
    return { id: str(o.id, `${p}.id`), name: str(o.name, `${p}.name`) }
  })
}

function readCategory(value: unknown, path: string): MonarchCategory {
  const o = object(value, path)
  const group = optional(o.group, `${path}.group`, object)
  return {
    id: str(o.id, `${path}.id`),
    name: str(o.name, `${path}.name`),
    groupName: group === null ? null : str(group.name, `${path}.group.name`),
    groupType: group === null ? null : str(group.type, `${path}.group.type`),
    raw: value,
  }
}

function readAccount(value: unknown, path: string): MonarchAccount {
  const o = object(value, path)
  const type = optional(o.type, `${path}.type`, object)
  const subtype = optional(o.subtype, `${path}.subtype`, object)
  return {
    id: str(o.id, `${path}.id`),
    displayName: str(o.displayName, `${path}.displayName`),
    currentBalance: num(o.currentBalance, `${path}.currentBalance`),
    isAsset: bool(o.isAsset, `${path}.isAsset`),
    isHidden: bool(o.isHidden, `${path}.isHidden`),
    syncDisabled: bool(o.syncDisabled, `${path}.syncDisabled`),
    deactivatedAt: optional(o.deactivatedAt, `${path}.deactivatedAt`, str),
    holdingsCount: num(o.holdingsCount, `${path}.holdingsCount`),
    typeName: type === null ? "" : str(type.name, `${path}.type.name`),
    subTypeName: subtype === null ? "" : str(subtype.name, `${path}.subtype.name`),
    raw: value,
  }
}

function readTransaction(value: unknown, path: string): MonarchTransaction {
  const o = object(value, path)
  const tags = array(o.tags ?? [], `${path}.tags`).map((t, i) => {
    const tag = object(t, `${path}.tags[${i}]`)
    return {
      id: str(tag.id, `${path}.tags[${i}].id`),
      name: str(tag.name, `${path}.tags[${i}].name`),
      color: optional(tag.color, `${path}.tags[${i}].color`, str),
      order: optional(tag.order, `${path}.tags[${i}].order`, num),
    }
  })
  return {
    id: str(o.id, `${path}.id`),
    date: str(o.date, `${path}.date`),
    amount: num(o.amount, `${path}.amount`),
    pending: bool(o.pending, `${path}.pending`),
    isRecurring: bool(o.isRecurring, `${path}.isRecurring`),
    hideFromReports: bool(o.hideFromReports, `${path}.hideFromReports`),
    needsReview: bool(o.needsReview, `${path}.needsReview`),
    isSplitTransaction: bool(o.isSplitTransaction, `${path}.isSplitTransaction`),
    notes: optional(o.notes, `${path}.notes`, str),
    account: readNamed(o.account ?? null, `${path}.account`),
    category: readNamed(o.category ?? null, `${path}.category`),
    merchant: readNamed(o.merchant ?? null, `${path}.merchant`),
    tags,
    raw: value,
  }
}

function readHolding(value: unknown, path: string): MonarchHolding {
  const o = object(value, path)
  const security = optional(o.security, `${path}.security`, object)
  const first = optional(
    array(o.holdings ?? [], `${path}.holdings`)[0] ?? null,
    `${path}.holdings[0]`,
    object
  )
  const nameOf = (o2: Record<string, unknown> | null, key: string): string | null =>
    o2 === null ? null : optional(o2[key], `${path}.${key}`, str)
  return {
    id: str(o.id, `${path}.id`),
    quantity: num(o.quantity, `${path}.quantity`),
    basis: optional(o.basis, `${path}.basis`, num),
    totalValue: num(o.totalValue, `${path}.totalValue`),
    securityName: nameOf(security, "name") ?? nameOf(first, "name") ?? "",
    ticker: nameOf(security, "ticker") ?? nameOf(first, "ticker"),
    raw: value,
  }
}

export interface MonarchClient {
  readonly accounts: () => Promise<readonly MonarchAccount[]>
  readonly categories: () => Promise<readonly MonarchCategory[]>
  readonly transactions: (window: {
    readonly startDate?: string
    readonly endDate?: string
    readonly ids?: readonly string[]
  }) => Promise<readonly MonarchTransaction[]>
  readonly transactionStamps: (window: {
    readonly startDate: string
    readonly endDate: string
  }) => Promise<readonly MonarchStamp[]>
  readonly holdings: (accountId: string) => Promise<readonly MonarchHolding[]>
}

export async function monarchQuery(
  auth: Readonly<Record<string, string>>,
  operationName: string,
  queryText: string,
  variables: Record<string, unknown>
): Promise<Record<string, unknown>> {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS)
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...auth },
      body: JSON.stringify({ operationName, query: queryText, variables }),
      signal: controller.signal,
    })
    if (!response.ok) {
      throw new Error(`Monarch API ${response.status}: ${response.statusText}`)
    }
    const envelope = object(await response.json(), operationName)
    const errors = envelope.errors
    if (Array.isArray(errors) && errors.length > 0) {
      const messages = errors
        .map((e, i) => str(object(e, `${operationName}.errors[${i}]`).message, "message"))
        .join("; ")
      throw new Error(`Monarch GraphQL error: ${messages}`)
    }
    return object(envelope.data, `${operationName}.data`)
  } finally {
    clearTimeout(timer)
  }
}

export function monarchClient(auth: Readonly<Record<string, string>>): MonarchClient {
  const query = (
    operationName: string,
    queryText: string,
    variables: Record<string, unknown>
  ): Promise<Record<string, unknown>> => monarchQuery(auth, operationName, queryText, variables)

  async function accounts(): Promise<readonly MonarchAccount[]> {
    const data = await query("GetAccounts", ACCOUNTS_QUERY, {})
    return array(data.accounts, "accounts").map((a, i) => readAccount(a, `accounts[${i}]`))
  }

  async function categories(): Promise<readonly MonarchCategory[]> {
    const data = await query("GetCategories", CATEGORIES_QUERY, {})
    return array(data.categories, "categories").map((c, i) => readCategory(c, `categories[${i}]`))
  }

  async function transactions(window: {
    readonly startDate?: string
    readonly endDate?: string
    readonly ids?: readonly string[]
  }): Promise<readonly MonarchTransaction[]> {
    const filters: Record<string, unknown> = { search: "" }
    if (window.startDate != null && window.endDate != null) {
      filters.startDate = window.startDate
      filters.endDate = window.endDate
    }
    if (window.ids !== undefined) filters.ids = [...window.ids]
    const all: MonarchTransaction[] = []
    let offset = 0
    for (;;) {
      const data = await query("GetTransactionsList", TRANSACTIONS_QUERY, {
        offset,
        limit: PAGE_SIZE,
        orderBy: "date",
        filters,
      })
      const page = object(data.allTransactions, "allTransactions")
      const results = array(page.results, "allTransactions.results")
      const totalCount = num(page.totalCount, "allTransactions.totalCount")
      all.push(
        ...results.map((t, i) => readTransaction(t, `allTransactions.results[${offset + i}]`))
      )
      offset += results.length
      if (results.length === 0 || offset >= totalCount) return all
    }
  }

  async function transactionStamps(window: {
    readonly startDate: string
    readonly endDate: string
  }): Promise<readonly MonarchStamp[]> {
    const data = await query("GetTransactionsList", STAMPS_QUERY, {
      limit: STAMP_LIMIT,
      filters: { search: "", startDate: window.startDate, endDate: window.endDate },
    })
    const page = object(data.allTransactions, "allTransactions")
    const results = array(page.results, "allTransactions.results")
    const totalCount = num(page.totalCount, "allTransactions.totalCount")
    if (results.length !== totalCount) {
      throw new Error(
        `the watermark request covers ${window.startDate} to ${window.endDate} in one page and ` +
          `Monarch answered ${results.length} of ${totalCount}. Nothing was compared, because ` +
          "every row left out of a short answer reads downstream as one that vanished. Raise " +
          "STAMP_LIMIT past the window's size."
      )
    }
    return results.map((t, i) => {
      const o = object(t, `allTransactions.results[${i}]`)
      return {
        id: str(o.id, `allTransactions.results[${i}].id`),
        updatedAt: str(o.updatedAt, `allTransactions.results[${i}].updatedAt`),
      }
    })
  }

  async function holdings(accountId: string): Promise<readonly MonarchHolding[]> {
    const today = new Date().toISOString().slice(0, 10)
    const data = await query("Web_GetHoldings", HOLDINGS_QUERY, {
      input: {
        accountIds: [accountId],
        endDate: today,
        includeHiddenHoldings: true,
        startDate: today,
      },
    })
    const portfolio = object(data.portfolio, "portfolio")
    const aggregate = object(portfolio.aggregateHoldings, "portfolio.aggregateHoldings")
    return array(aggregate.edges, "portfolio.aggregateHoldings.edges").map((e, i) => {
      const path = `portfolio.aggregateHoldings.edges[${i}].node`
      return readHolding(object(e, `portfolio.aggregateHoldings.edges[${i}]`).node, path)
    })
  }

  return { accounts, categories, transactions, transactionStamps, holdings }
}
