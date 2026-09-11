import { __TS__CloneDescriptor } from "akasha/design/language/lua-compiler/lualibs/clone-descriptor/clone-descriptor.lualib.code.ts"
import { __TS__DescriptorGet } from "akasha/design/language/lua-compiler/lualibs/descriptor-get/descriptor-get.lualib.code.ts"
import { __TS__DescriptorSet } from "akasha/design/language/lua-compiler/lualibs/descriptor-set/descriptor-set.lualib.code.ts"

const getmetatable = _G.getmetatable

function descriptorIndex(this: any, key: string): undefined {
  return __TS__DescriptorGet.call(this, getmetatable(this), key)
}

function descriptorNewIndex(this: any, key: string, value: any): undefined {
  return __TS__DescriptorSet.call(this, getmetatable(this), key, value)
}

export function __TS__SetDescriptor(
  this: void,
  target: any,
  key: any,
  desc: PropertyDescriptor,
  isPrototype = false
): undefined {
  let metatable = isPrototype ? target : getmetatable(target)
  if (!metatable) {
    metatable = {}
    setmetatable(target, metatable)
  }

  const value = rawget(target, key)
  if (value !== undefined) rawset(target, key, undefined)

  if (!rawget(metatable, "_descriptors")) metatable._descriptors = {}
  metatable._descriptors[key] = __TS__CloneDescriptor(desc)
  metatable.__index = descriptorIndex
  metatable.__newindex = descriptorNewIndex
}
