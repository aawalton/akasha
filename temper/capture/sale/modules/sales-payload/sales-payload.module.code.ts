export interface SaleEntry {
  saleId?: string
  itemLink?: string
  itemName?: string
  itemId?: number
  quantity?: number
  price?: number
  tax?: number
  buyerName?: string
  guildName?: string
  soldAt?: number
}

export interface SalesPayload {
  version?: number
  displayName?: string
  sales?: Record<string, SaleEntry>
}
