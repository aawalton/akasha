import "akasha/temper/eso/type/eso-enums-07/eso-enums-07.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-14/eso-enums-14.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-event-manager/eso-event-manager.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-events/eso-events.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-03/eso-functions-03.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"

function issuePost(
  this: void,
  bag: number,
  slot: number,
  quantity: number,
  totalPrice: number
): undefined {
  RequestPostItemOnTradingHouse(bag, slot, quantity, totalPrice)
}

type PostResult = (this: void, ok: boolean, reason: number | undefined) => void

interface PendingPost {
  readonly bag: number
  readonly slot: number
  readonly quantity: number
  readonly totalPrice: number
  readonly onResult: PostResult
  posted: boolean
}

export interface SellFlow {
  postItem: (
    this: void,
    bag: number,
    slot: number,
    quantity: number,
    totalPrice: number,
    onResult: PostResult
  ) => undefined
  dispose: (this: void) => undefined
}

let staging = 0

export function isStagingPost(this: void): boolean {
  return staging > 0
}

export function createSellFlow(this: void, addonName: string): SellFlow {
  const ns = `${addonName}_SellFlow`
  let pending: PendingPost | undefined

  function settle(this: void, ok: boolean, reason: number | undefined): undefined {
    const post = pending
    if (post === undefined) return
    pending = undefined
    staging -= 1
    post.onResult(ok, reason)
  }

  EVENT_MANAGER.RegisterForEvent(
    `${ns}_Pending`,
    EVENT_TRADING_HOUSE_PENDING_ITEM_UPDATE,
    function (this: void, _eventCode: number, slotId: number, isPending: boolean): undefined {
      const post = pending
      if (post === undefined) return
      if (post.posted) return
      if (!isPending) return
      if (slotId !== post.slot) return
      post.posted = true
      issuePost(post.bag, post.slot, post.quantity, post.totalPrice)
    }
  )

  EVENT_MANAGER.RegisterForEvent(
    `${ns}_Response`,
    EVENT_TRADING_HOUSE_RESPONSE_RECEIVED,
    function (this: void, _eventCode: number, responseType: number, result: number): undefined {
      if (responseType !== TRADING_HOUSE_RESULT_POST_PENDING) return
      const ok = result === TRADING_HOUSE_RESULT_SUCCESS
      settle(ok, ok ? undefined : result)
    }
  )

  EVENT_MANAGER.RegisterForEvent(
    `${ns}_Error`,
    EVENT_TRADING_HOUSE_ERROR,
    function (this: void, _eventCode: number, errorCode: number): undefined {
      settle(false, errorCode)
    }
  )

  EVENT_MANAGER.RegisterForEvent(
    `${ns}_Close`,
    EVENT_CLOSE_TRADING_HOUSE,
    function (this: void): undefined {
      settle(false, undefined)
    }
  )

  return {
    postItem(bag, slot, quantity, totalPrice, onResult): undefined {
      if (pending !== undefined) {
        d(`[${addonName}] sell-flow: a post is already in flight; ignoring.`)
        onResult(false, undefined)
        return
      }
      if (bag !== BAG_BACKPACK) {
        d(`[${addonName}] sell-flow: item not in backpack (bag=${bag}); post skipped.`)
        onResult(false, undefined)
        return
      }
      pending = { bag, slot, quantity, totalPrice, onResult, posted: false }
      staging += 1
      SetPendingItemPost(bag, slot, quantity)
    },
    dispose(): undefined {
      EVENT_MANAGER.UnregisterForEvent(`${ns}_Pending`, EVENT_TRADING_HOUSE_PENDING_ITEM_UPDATE)
      EVENT_MANAGER.UnregisterForEvent(`${ns}_Response`, EVENT_TRADING_HOUSE_RESPONSE_RECEIVED)
      EVENT_MANAGER.UnregisterForEvent(`${ns}_Error`, EVENT_TRADING_HOUSE_ERROR)
      EVENT_MANAGER.UnregisterForEvent(`${ns}_Close`, EVENT_CLOSE_TRADING_HOUSE)
      if (pending !== undefined) staging -= 1
      pending = undefined
    },
  }
}
