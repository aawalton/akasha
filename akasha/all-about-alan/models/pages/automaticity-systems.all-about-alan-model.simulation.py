import math

N = 200000
T = list(range(1, N+1))

A_imp = 0.85
k_imp = -math.log(0.2) / 200
A_exp = 0.995
k_exp_base = -math.log(0.2) / 4000

skill_imp = [A_imp * (1 - math.exp(-k_imp*t)) for t in T]

sl_absent = [A_exp * (1 - math.exp(-k_exp_base*t)) for t in T]

p = 2
sl_intact = []
acc = 0.0
for i, t in enumerate(T):
    imp = skill_imp[i]
    engagement = max(0.05, 1.0 - (imp/A_imp)**p)
    dx = engagement * k_exp_base * (A_exp - acc)
    acc += dx
    sl_intact.append(max(imp, acc))

def first_idx_ge(arr, val):
    for i, x in enumerate(arr):
        if x >= val:
            return i
    return None

crit = 0.80 * A_imp
i_intact = first_idx_ge(sl_intact, crit)
i_absent = first_idx_ge(sl_absent, crit)

asymp_i = sl_intact[-1]
asymp_a = sl_absent[-1]
ceiling_delta = 100 * (asymp_a - asymp_i) / asymp_i
err_i = (1 - asymp_i) * 100
err_a = (1 - asymp_a) * 100

cx = None
for i in range(200, len(T)):
    if sl_absent[i] >= sl_intact[i]:
        cx = i; break
cx_t = T[cx] if cx else None

print("=== Acquisition rate ===")
print(f"Trials to 80% of A_imp ({crit:.3f}):")
print(f"  SL-intact:  {T[i_intact]}")
print(f"  SL-absent:  {T[i_absent]}")
print(f"  Multiplier: {T[i_absent]/T[i_intact]:.1f}x slower for SL-absent")
print()
print("=== Ceiling at t=200,000 ===")
print(f"  SL-intact:  skill {asymp_i:.4f}, error {err_i:.2f}%")
print(f"  SL-absent:  skill {asymp_a:.4f}, error {err_a:.2f}%")
print(f"  Ceiling delta: +{ceiling_delta:.1f}% skill")
print(f"  Error-rate ratio: SL-intact has {err_i/err_a:.1f}x more residual error")
print()
print("=== Crossover ===")
print(f"  Crossover at t = {cx_t}")
if cx_t and cx_t*10 <= N:
    pi = sl_intact[cx_t*10-1]; pa = sl_absent[cx_t*10-1]
    print(f"  At 10x crossover (t={cx_t*10}):")
    print(f"    SL-intact: {pi:.4f} (err {(1-pi)*100:.2f}%)")
    print(f"    SL-absent: {pa:.4f} (err {(1-pa)*100:.2f}%)")
    print(f"    Skill gap: +{100*(pa-pi)/pi:.1f}%")
    print(f"    Error-rate gap: SL-intact has {(1-pi)/(1-pa):.1f}x more residual error at 10x")
print()
print("=== Sensitivity sweep ===")
print("Engagement-decay exponent p (steeper = harder plateau on SL-intact):")
for p_var in [1, 2, 3, 4]:
    accv = 0.0; si = []
    for i, t in enumerate(T):
        imp = skill_imp[i]
        eng = max(0.05, 1.0 - (imp/A_imp)**p_var)
        accv += eng * k_exp_base * (A_exp - accv)
        si.append(max(imp, accv))
    cd = 100*(sl_absent[-1]-si[-1])/si[-1]
    print(f"  p={p_var}: SL-intact asymp={si[-1]:.4f}, ceiling delta=+{cd:.1f}%, err ratio {(1-si[-1])/(1-sl_absent[-1]):.1f}x")
print()
print("Acquisition slowdown ratio (k_exp_base = k_imp/ratio) -> crossover & 10x:")
for ratio in [5, 10, 20, 40]:
    ke = k_imp / ratio
    sa = [A_exp*(1-math.exp(-ke*t)) for t in T]
    accv = 0.0; si = []
    for i, t in enumerate(T):
        imp = skill_imp[i]
        eng = max(0.05, 1.0 - (imp/A_imp)**2)
        accv += eng * ke * (A_exp - accv)
        si.append(max(imp, accv))
    cxv = None
    for i in range(200, len(T)):
        if sa[i] >= si[i]: cxv=i; break
    cxv_t = T[cxv] if cxv else None
    print(f"  ratio={ratio}x: crossover t={cxv_t}, SL-absent asymp={sa[-1]:.4f}, SL-intact asymp={si[-1]:.4f}")
print()
print("Residual-floor severity (A_imp) -> ceiling delta:")
for ai in [0.70, 0.80, 0.85, 0.90, 0.95]:
    ki = -math.log(0.2)/200
    si_arr = [ai*(1-math.exp(-ki*t)) for t in T]
    accv = 0.0; si = []
    for i, t in enumerate(T):
        imp = si_arr[i]
        eng = max(0.05, 1.0-(imp/ai)**2)
        accv += eng * k_exp_base * (A_exp - accv)
        si.append(max(imp, accv))
    cd = 100*(sl_absent[-1]-si[-1])/si[-1]
    print(f"  A_imp={ai} (floor {(1-ai)*100:.0f}%): SL-intact asymp={si[-1]:.4f}, delta=+{cd:.1f}%")
