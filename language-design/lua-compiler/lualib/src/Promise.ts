export type PromiseInternalState<T> =
  | { tag: "pending" }
  | { tag: "fulfilled"; value: T }
  | { tag: "rejected"; reason: any }

type PromiseExecutor<T> = ConstructorParameters<typeof Promise<T>>[0]
type PromiseResolve<T> = Parameters<PromiseExecutor<T>>[0]
type PromiseReject = Parameters<PromiseExecutor<unknown>>[1]
type PromiseResolveCallback<TValue, TResult> = (value: TValue) => TResult | PromiseLike<TResult>
type PromiseRejectCallback<TResult> = (reason: any) => TResult | PromiseLike<TResult>

function makeDeferredPromiseFactory(this: void) {
  let resolve: PromiseResolve<any>
  let reject: PromiseReject
  const executor: PromiseExecutor<any> = (res, rej) => {
    resolve = res
    reject = rej
  }
  return function <T>(this: void) {
    const promise = new Promise<T>(executor)
    return $multi(promise, resolve, reject)
  }
}

const makeDeferredPromise = makeDeferredPromiseFactory()

function isPromiseLike<T>(this: void, value: unknown): value is PromiseLike<T> {
  return value instanceof __TS__Promise
}

function as__TS__Promise<T>(this: void, value: PromiseLike<T>): __TS__Promise<T> {
  return value as __TS__Promise<T>
}

function Awaited<T>(this: void, value: T | PromiseLike<T>): Awaited<T> {
  return value as Awaited<T>
}

function asPromise<T>(this: void, p: Promise<unknown>): Promise<T> {
  return p as Promise<T>
}

function doNothing(): undefined {}

const pcall = _G.pcall

export class __TS__Promise<T> implements Promise<T> {
  public state: PromiseInternalState<T> = { tag: "pending" }

  private fulfilledCallbacks: Array<(value: T) => void> = []
  private rejectedCallbacks: PromiseReject[] = []
  private finallyCallbacks: Array<() => void> = []

  public declare readonly [Symbol.toStringTag]: string

  public static resolve<T>(this: void, value: T | PromiseLike<T>): __TS__Promise<Awaited<T>> {
    if (value instanceof __TS__Promise) {
      return value
    }
    const promise = new __TS__Promise<Awaited<T>>(doNothing)
    promise.state = { tag: "fulfilled", value: Awaited(value) }
    return promise
  }

  public static reject<T = never>(this: void, reason?: any): __TS__Promise<T> {
    const promise = new __TS__Promise<T>(doNothing)
    promise.state = { tag: "rejected", reason }
    return promise
  }

  constructor(executor: PromiseExecutor<T>) {
    const [success, error] = pcall(
      executor,
      undefined,
      (v) => this.resolve(v),
      (err) => this.reject(err)
    )
    if (!success) {
      this.reject(error)
    }
  }

  public then<TResult1 = T, TResult2 = never>(
    onFulfilled?: PromiseResolveCallback<T, TResult1>,
    onRejected?: PromiseRejectCallback<TResult2>
  ): Promise<TResult1 | TResult2> {
    const [promise, resolve, reject] = makeDeferredPromise<T | TResult1 | TResult2>()

    this.addCallbacks(
      onFulfilled ? this.createPromiseResolvingCallback(onFulfilled, resolve, reject) : resolve,
      onRejected ? this.createPromiseResolvingCallback(onRejected, resolve, reject) : reject
    )

    return asPromise<TResult1 | TResult2>(promise)
  }

  public addCallbacks(
    fulfilledCallback: (value: T) => void,
    rejectedCallback: (rejectionReason: any) => void
  ): undefined {
    if (this.state.tag === "fulfilled") {
      return fulfilledCallback(this.state.value)
    }
    if (this.state.tag === "rejected") {
      return rejectedCallback(this.state.reason)
    }

    this.fulfilledCallbacks.push(fulfilledCallback)
    this.rejectedCallbacks.push(rejectedCallback)
  }

  public catch<TResult = never>(
    onRejected?: (reason: any) => TResult | PromiseLike<TResult>
  ): Promise<T | TResult> {
    return this.then(undefined, onRejected)
  }

  public finally(onFinally?: () => void): Promise<T> {
    if (onFinally) {
      this.finallyCallbacks.push(onFinally)

      if (this.state.tag !== "pending") {
        onFinally()
      }
    }
    return this
  }

  private resolve(value: T | PromiseLike<T>): undefined {
    if (isPromiseLike<T>(value)) {
      return as__TS__Promise(value).addCallbacks(
        (v) => this.resolve(v),
        (err) => this.reject(err)
      )
    }

    if (this.state.tag === "pending") {
      this.state = { tag: "fulfilled", value }

      return this.invokeCallbacks(this.fulfilledCallbacks, value)
    }
  }

  private reject(reason: any): undefined {
    if (this.state.tag === "pending") {
      this.state = { tag: "rejected", reason }

      return this.invokeCallbacks(this.rejectedCallbacks, reason)
    }
  }

  private invokeCallbacks<T>(callbacks: ReadonlyArray<(value: T) => void>, value: T): undefined {
    const callbacksLength = callbacks.length
    const finallyCallbacks = this.finallyCallbacks
    const finallyCallbacksLength = finallyCallbacks.length

    if (callbacksLength !== 0) {
      for (const i of $range(1, callbacksLength - 1)) {
        callbacks[i - 1](value)
      }
      if (finallyCallbacksLength === 0) {
        return callbacks[callbacksLength - 1](value)
      }
      callbacks[callbacksLength - 1](value)
    }

    if (finallyCallbacksLength !== 0) {
      for (const i of $range(1, finallyCallbacksLength - 1)) {
        finallyCallbacks[i - 1]()
      }
      return finallyCallbacks[finallyCallbacksLength - 1]()
    }
  }

  private createPromiseResolvingCallback<TResult1, TResult2>(
    f: PromiseResolveCallback<T, TResult1> | PromiseRejectCallback<TResult2>,
    resolve: (data: TResult1 | TResult2) => void,
    reject: (reason: any) => void
  ) {
    return (value: T): undefined => {
      const [success, resultOrError] = pcall<
        undefined,
        [T],
        TResult1 | PromiseLike<TResult1> | TResult2 | PromiseLike<TResult2>
      >(f, undefined, value)
      if (!success) {
        return reject(resultOrError)
      }
      return this.handleCallbackValue(resultOrError, resolve, reject)
    }
  }

  private handleCallbackValue<TResult1, TResult2, TResult extends TResult1 | TResult2>(
    value: TResult | PromiseLike<TResult>,
    resolve: (data: TResult1 | TResult2) => void,
    reject: (reason: any) => void
  ): undefined {
    if (isPromiseLike<TResult>(value)) {
      const nextpromise = as__TS__Promise(value)
      if (nextpromise.state.tag === "fulfilled") {
        return resolve(nextpromise.state.value)
      } else if (nextpromise.state.tag === "rejected") {
        return reject(nextpromise.state.reason)
      } else {
        return nextpromise.addCallbacks(resolve, reject)
      }
    } else {
      return resolve(value)
    }
  }
}
